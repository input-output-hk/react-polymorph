import React, { Component } from 'react';
import { func, object, number, string } from 'prop-types';

// external libraries
import { flow } from 'lodash';

// Input's theme API
import { INPUT_THEME_API } from '../themes/API';

// internal utility functions
import composeTheme from '../utils/composeTheme.js';
import { StringOrElement } from '../utils/props';

class NumericInput extends Component {
  static propTypes = {
    onRef: func,
    onChange: func,
    error: StringOrElement,
    value: string,
    placeholder: string,
    maxBeforeDot: number, // max number of characters before dot
    maxAfterDot: number, // max number of characters after dot
    maxValue: number, // max allowed numeric value
    minValue: number, // min allowed numeric value
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    onRef: () => {},
    value: '',
    error: '',
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...INPUT_THEME_API }
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.input
        ? context.theme.input
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI),
      caretPosition: 0, // Current caret position
      separatorsCount: 0, // Number of comma separators used for calculating caret position after separators are injected
      error: null, // Inner (Component) state error // e.g. if value > maxValue set error message
      oldValue: null // Last recorded value before input change
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
      this.state.oldValue != prevState.oldValue ||
      this.state.caretPosition != prevState.caretPosition
    ) {
      if (
        this.state.separatorsCount != prevState.separatorsCount &&
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

  onChange = event => {
    const { onChange, disabled } = this.props;

    if (disabled) return;

    const processedValue = this._processValue(
      event.target.value,
      event.target.selectionStart,
      {}
    );

    if (onChange) onChange(processedValue, event);
  };

  focus = () => this.inputElement.focus();

  blur = () => this.inputElement.blur();

  _setError = error => {
    const { setError } = this.props;

    // checks for setError func from FormField component
    // if this Input instance is being used within the render function
    // of a FormField instance, the error field within FormField's local state
    // will be set
    if (setError) setError(error);
    this.setState({ error });
  };

  _processValue(value, position) {
    return flow([
      this._enforceNumericValue,
      this._parseToParts,
      this._enforceMaxLengths,
      this._separate
    ]).call(this, value, position);
  }

  _enforceNumericValue(value, position) {
    const regex = /^[0-9.,]+$/;
    let isValueRegular = regex.test(value);
    let handledValue;
    const lastValidValue = this.state.oldValue;
    if (!isValueRegular && value !== '') {
      // input contains invalid value
      // e.g. 1,00AAbasdasd.asdasd123123
      // - reject it and show last valid value
      handledValue = lastValidValue ? lastValidValue : '0.000000';
      position = position - 1;
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
      position = position - 1;
    }

    return !this._isNumeric(value)
      ? { value: handledValue, position }
      : { value, position };
  }

  _parseToParts(data) {
    const value = data.value;
    let position = data.position;

    // show placeholder on select all and delete/backspace key action
    if (!value) return;

    let beforeDot, afterDot;
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
    if (value.charAt(0) === '0' && parseInt(beforeDot.replace(/,/g, '')) > 0) {
      beforeDot = parseInt(beforeDot.replace(/,/g, ''));
      if (position !== 2) {
        position = 0;
      } else {
        position = 1;
      }
    } else if (parseInt(beforeDot.replace(/,/g, '')) === 0) {
      beforeDot = parseInt(beforeDot.replace(/,/g, ''));
    }

    return { value, position, parts: { beforeDot, afterDot } };
  }

  _enforceMaxLengths(data) {
    if (!data) return;

    const { maxBeforeDot, maxAfterDot, minValue, maxValue } = this.props;
    const value = data.value;
    let position = data.position;
    let beforeDot = data.parts.beforeDot;
    let afterDot = data.parts.afterDot;

    // preventing numbers with more than maxBeforeDot units
    // - return first maxBeforeDot numbers (with comma separators)
    if (maxBeforeDot && beforeDot) {
      // max number of commas depending on max number of characters before dot
      const numberOfCommas =
        maxBeforeDot % 3 > 0
          ? parseInt(maxBeforeDot / 3)
          : parseInt(maxBeforeDot / 3) - 1;
      const maxBeforeDotWithSeparator = maxBeforeDot + numberOfCommas;
      if (beforeDot.length > maxBeforeDotWithSeparator) {
        beforeDot = beforeDot.substring(0, maxBeforeDotWithSeparator);
      }
    }

    // remove commas from decimal part (e.g. 123,23,2.002000 -> dot after 2.character reproduce 12.3,23,2)
    afterDot = afterDot.replace(/,/g, '');
    // preventing numbers with more than maxAfterDot units - return first maxAfterDot numbers
    if (maxAfterDot && afterDot && afterDot.length > maxAfterDot) {
      afterDot = afterDot.substring(0, maxAfterDot);
    }

    // if decimal number has less than maxAfterDot numbers add trailing zeros
    let afterDotLength = afterDot ? afterDot.length : 0;
    if (maxAfterDot && afterDotLength < maxAfterDot) {
      let i;
      for (afterDotLength; afterDotLength < maxAfterDot; afterDotLength++) {
        afterDot = afterDot + '0';
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
      this._setError(null);
    }

    this.setState({ caretPosition: position });
    return result;
  }

  _separate(value, position) {
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

  _isNumeric(value) {
    const replacedValue = value.replace(/,/g, '');
    return !isNaN(parseFloat(replacedValue)) && isFinite(replacedValue);
  }

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: InputSkin,
      theme,
      themeOverrides,
      themeAPI,
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

export default NumericInput;
