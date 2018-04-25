// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

// external libraries
import { flow } from 'lodash';

// internal utility functions
import { withTheme } from '../themes/withTheme';
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  error: string | Element,
  onChange: Function,
  maxAfterDot: number,
  maxBeforeDot: number,
  maxValue: number,
  minValue: number,
  onRef: Function,
  placeholder: string,
  setError: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  value: string
};

type State = {
  composedTheme: Object,
  caretPosition: number,
  separatorsCount: number,
  error: string,
  oldValue: string
};

class NumericInput extends Component<Props, State> {
  inputElement: HTMLInputElement;

  static defaultProps = {
    disabled: false,
    error: '',
    onRef: () => {},
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
    value: ''
  };

  constructor(props: Props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      caretPosition: 0,
      separatorsCount: 0,
      error: '',
      oldValue: ''
    };
  }

  // ========= COMPONENT LIFE CYCLE =========

  componentDidMount() {
    // if NumericInput is rendered by FormField, onRef allows FormField to call
    // NumericInput's focus method when someone clicks on FormField's label
    this.props.onRef(this);

    // Set last input caret position on updates
    this.setState({ caretPosition: this.inputElement.selectionStart });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.inputElement !== document.activeElement) return;

    // caret position calculation after separators injection
    let caretPosition;
    // prevent unnecessary changes on re-rendering
    if (
      this.state.oldValue !== prevState.oldValue ||
      this.state.caretPosition !== prevState.caretPosition
    ) {
      if (
        this.state.separatorsCount !== prevState.separatorsCount &&
        this.state.separatorsCount - prevState.separatorsCount <= 1 &&
        this.state.separatorsCount - prevState.separatorsCount >= -1
      ) {
        caretPosition =
          this.state.caretPosition +
          (this.state.separatorsCount - prevState.separatorsCount);
      } else {
        caretPosition = this.state.caretPosition;
      }
      caretPosition = caretPosition >= 0 ? caretPosition : 0;
      this.inputElement.selectionEnd = caretPosition;
      this.inputElement.selectionStart = caretPosition;
    }
  }

  onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange, disabled } = this.props;

    if (disabled) return;

    const processedValue = this._processValue(
      event.target.value,
      event.target.selectionStart
    );

    if (onChange) onChange(processedValue, event);
  };

  focus = () => this.inputElement.focus();

  blur = () => this.inputElement.blur();

  _setError = (error: string) => {
    const { setError } = this.props;

    // checks for setError func from FormField component
    // if this Input instance is being used within the render function
    // of a FormField instance, the error field within FormField's local state
    // will be set
    if (setError) setError(error);
    this.setState({ error });
  };

  _processValue(value: string, position: number) {
    return flow([
      this._enforceNumericValue,
      this._parseToParts,
      this._enforceMaxLengths,
      this._separate
    ]).call(this, value, position);
  }

  _enforceNumericValue(value: string, position: number) {
    const regex = /^[0-9.,]+$/;
    const isValueRegular = regex.test(value);
    let handledValue;
    const lastValidValue = this.state.oldValue;
    if (!isValueRegular && value !== '') {
      // input contains invalid value
      // e.g. 1,00AAbasdasd.asdasd123123
      // - reject it and show last valid value
      handledValue = lastValidValue || '0.000000';
      position -= 1;
    } else if (!this._isNumeric(value)) {
      // input contains comma separated number
      // e.g. 1,000,000.123456
      // - make sure commas and caret are at correct position
      const splitedValue = value.split('.');
      if (splitedValue.length === 3) {
        // input value contains more than one dot
        const splitedOldValue = lastValidValue.split('.');
        let beforeDot = splitedValue[0] + splitedValue[1];
        if (splitedOldValue[0].length < beforeDot.length) {
          // dot is in decimal part
          position -= 1;
          handledValue = beforeDot + '.' + splitedValue[2];
          beforeDot = beforeDot.replace(/,/g, '');
          // prevent replace dot if length before dot is greater then max before dot length
          if (beforeDot.length > this.props.maxBeforeDot) {
            handledValue = lastValidValue;
          }
        } else {
          handledValue =
            splitedValue[0] + '.' + splitedValue[1] + splitedValue[2];
          // Second dot was entered after current one -> stay in same position (swallow dot)
          if (position > beforeDot.length + 1) {
            position -= 1;
          }
        }
      } else if (
        splitedValue.length === 2 &&
        splitedValue[0] === '' &&
        splitedValue[1] === ''
      ) {
        // special case when dot is inserted in an empty input
        // - return 0.|00000
        handledValue = '0.000000';
        position = 2; // position caret after the dot
      } else if (value !== '') {
        // special case when user selects part of an input value and hits ',' key
        // - reject it and show last valid value
        handledValue = lastValidValue;
      }
    }

    const lastInsertedCharacter = value.substring(position - 1, position);
    if (lastInsertedCharacter === ',') {
      // prevent move caret position on hit ','
      position -= 1;
    }

    return !this._isNumeric(value)
      ? { value: handledValue, position }
      : { value, position };
  }

  _parseToParts(data: { value: string, position: number }) {
    const value = data.value;
    let position = data.position;

    // show placeholder on select all and delete/backspace key action
    if (!value) return;

    let beforeDot;
    let afterDot;

    if (data.value.length > 1 && value.split('.').length < 2) {
      // handle numbers deletion from both integer and decimal parts at once
      beforeDot = value.substring(0, position) || '0';
      afterDot = value.substring(position, value.length);
    } else {
      // split float number to integer and decimal part - regular way
      const splitedValue = value.split('.');
      beforeDot = splitedValue[0] ? splitedValue[0] : '0';
      afterDot = splitedValue[1] ? splitedValue[1] : '000000';
    }

    // remove leading zero and update caret position
    if (value.charAt(0) === '0' && parseInt(beforeDot.replace(/,/g, ''), 10) > 0) {
      beforeDot = parseInt(beforeDot.replace(/,/g, ''), 10);
      if (position !== 2) {
        position = 0;
      } else {
        position = 1;
      }
    } else if (parseInt(beforeDot.replace(/,/g, ''), 10) === 0) {
      beforeDot = parseInt(beforeDot.replace(/,/g, ''), 10);
    }

    return { value, position, parts: { beforeDot, afterDot } };
  }

  _enforceMaxLengths(data: {
    value: string,
    position: number,
    parts: {
      beforeDot: string,
      afterDot: string
    }
  }) {
    if (!data) return;

    const { maxBeforeDot, maxAfterDot, minValue, maxValue } = this.props;
    const position = data.position;
    let beforeDot = data.parts.beforeDot;
    let afterDot = data.parts.afterDot;

    // preventing numbers with more than maxBeforeDot units
    // - return first maxBeforeDot numbers (with comma separators)
    if (maxBeforeDot && beforeDot) {
      // max number of commas depending on max number of characters before dot
      const numberOfCommas =
        maxBeforeDot % 3 > 0
          ? parseInt(maxBeforeDot / 3, 10)
          : parseInt(maxBeforeDot / 3, 10) - 1;
      const maxBeforeDotWithSeparator = maxBeforeDot + numberOfCommas;
      if (beforeDot.length > maxBeforeDotWithSeparator) {
        beforeDot = beforeDot.substring(0, maxBeforeDotWithSeparator);
      }
    }

    // remove commas from decimal part
    // (e.g. 123,23,2.002000 -> dot after 2.character reproduce 12.3,23,2)
    afterDot = afterDot.replace(/,/g, '');
    // preventing numbers with more than maxAfterDot units - return first maxAfterDot numbers
    if (maxAfterDot && afterDot && afterDot.length > maxAfterDot) {
      afterDot = afterDot.substring(0, maxAfterDot);
    }

    // if decimal number has less than maxAfterDot numbers add trailing zeros
    let afterDotLength = afterDot ? afterDot.length : 0;
    if (maxAfterDot && afterDotLength < maxAfterDot) {
      for (afterDotLength; afterDotLength < maxAfterDot; afterDotLength++) {
        afterDot += '0';
      }
    }

    const result = beforeDot + '.' + afterDot;

    // check min and max value
    const resultWithoutSeparators = parseFloat(result.replace(/,/g, ''));
    if (
      (maxValue && resultWithoutSeparators > maxValue) ||
      (minValue && resultWithoutSeparators < minValue)
    ) {
      this._setError('Please enter a valid amount');
    } else if (this.state.error !== '') {
      this._setError('');
    }

    this.setState({ caretPosition: position });
    return result;
  }

  _separate(value: string) {
    this.setState({ oldValue: value });
    if (value) {
      const splitedValue = value.split('.');
      const separatedValue = splitedValue[0]
        .replace(/,/g, '')
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3}\B)/g, '$1,')
        .split('')
        .reverse()
        .join('');
      const newSeparatorsCount = (separatedValue.match(/,/g) || []).length;
      this.setState({ separatorsCount: newSeparatorsCount });
      return separatedValue + '.' + splitedValue[1];
    }
  }

  _isNumeric(value: string) {
    const replacedValue = value.replace(/,/g, '');
    return !Number.isNaN(parseFloat(replacedValue)) && Number.isFinite(replacedValue);
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: InputSkin,
      theme,
      themeOverrides,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <InputSkin
        error={error || this.state.error}
        inputRef={el => (this.inputElement = el)}
        onChange={this.onChange}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default withTheme(NumericInput);
