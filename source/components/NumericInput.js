// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { ComponentType, SyntheticInputEvent, Element } from 'react';

// external libraries
import createRef from 'create-react-ref/lib/createRef';
import { flow } from 'lodash';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  autoFocus?: boolean,
  className?: string,
  context: ThemeContextProp,
  disabled?: boolean,
  enforceMax: boolean,
  label?: string | Element<any>,
  enforceMin: boolean,
  error?: string,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  maxAfterDot?: number,
  maxBeforeDot?: number,
  maxValue?: number,
  minValue?: number,
  readOnly?: boolean,
  placeholder?: string,
  setError?: Function,
  skin?: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
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

class NumericInputBase extends Component<Props, State> {
  // declare ref types
  inputElement: Element<'input'>;

  // define static properties
  static displayName = 'NumericInput';
  static defaultProps = {
    context: createEmptyContext(),
    enforceMax: false,
    enforceMin: false,
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
    value: ''
  };

  constructor(props: Props) {
    super(props);
    const { context, minValue, maxBeforeDot, maxAfterDot, themeId, theme, themeOverrides } = props;

    const minValueIsNum = typeof minValue === 'number';
    // if minValue is a number and user supplied maxBeforeDot and/or maxAfterDot
    if (minValue && minValueIsNum && (maxBeforeDot || maxAfterDot)) {
      // check combination of values for validity
      this._validateLimitProps(minValue, maxBeforeDot, maxAfterDot);
    }

    // define ref
    this.inputElement = createRef();

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

  componentDidMount() {
    const { inputElement } = this;
    // check for autoFocus prop
    if (this.props.autoFocus) this.focus();

    // Set last input caret position on updates
    if (inputElement && inputElement.current) {
      this.setState({ caretPosition: inputElement.current.selectionStart });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { inputElement } = this;
    if (inputElement && inputElement.current !== document.activeElement) { return; }

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

      if (inputElement && inputElement.current) {
        inputElement.current.selectionEnd = caretPosition;
        inputElement.current.selectionStart = caretPosition;
      }
    }
  }

  onChange = (event: SyntheticInputEvent<Element<'input'>>) => {
    event.preventDefault();
    const { onChange, disabled } = this.props;
    if (disabled) { return; }

    // it is crucial to remove whitespace from input value
    // with String.trim()
    const processedValue = this._processValue(
      event.target.value.trim(),
      event.target.selectionStart
    );

    // if the processed value is the same, then the user probably entered
    // invalid input such as nonnumeric characters, do not call onChange
    if (processedValue === this.state.oldValue) { return; }

    if (onChange) { onChange(processedValue, event); }
  };

  focus = () => {
    const { inputElement } = this;
    if (!inputElement.current) return;
    inputElement.current.focus();
  };

  _validateLimitProps(minValue?: number, maxBeforeDot?: number, maxAfterDot?: number) {
    if (typeof minValue !== 'number') return;
    const maxBeforeDotIsNum = typeof maxBeforeDot === 'number';
    const maxAfterDotIsNum = typeof maxAfterDot === 'number';
    // if minValue is a float, it will split at the decimal
    // trailing zeros are dropped with parseFloat
    const minValParts = parseFloat(minValue).toString().split('.');

    // if minValParts array has length of 2, it is a float
    if (minValParts.length >= 2) {
      const minValBeforeDot = minValParts[0];
      const minValAfterDot = minValParts[1];

      // if the number of integers in minValue is greater than maxBeforeDot
      if (maxBeforeDot && maxBeforeDotIsNum && (minValBeforeDot.length > maxBeforeDot)) {
        // the combo is incompatible, throw error
        const error = `
          minValue: ${minValue} exceeds the limit of maxBeforeDot: ${maxBeforeDot}.
          Adjust the values of these properties.
        `;
        throw new Error(error);
      // if the number of decimal spaces in minValue is greater than maxBeforeDot
      } else if (maxAfterDot && maxAfterDotIsNum && (minValAfterDot.length > maxAfterDot)) {
        const error = `
          minValue: ${minValue} exceeds the limit of maxAfterDot: ${maxAfterDot}.
          Adjust the values of these properties.
        `;
        throw new Error(error);
      }
    }
  }

  _setError = (error: string) => {
    const { setError } = this.props;

    // checks for setError func from FormField component
    // if this NumericInput instance is rendered within FormField's render prop,
    // FormField's local state.error will also be set via props.setError
    if (setError) setError(error);
    // also set (this: NumericInput)'s state.error
    this.setState({ error });
  };

  _processValue(value: string, position: number) {
    return flow([
      this._enforceNumericValue,
      this._parseToParts,
      this._enforceValueLimits,
      this._separate
    ]).call(this, value, position);
  }

  _enforceNumericValue(value: string, position: number) {
    const regex = /^[0-9.,]+$/;
    const isValueRegular = regex.test(value);
    const { maxBeforeDot } = this.props;
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

      // check if input value contains more than one decimal
      if (splitedValue.length === 3) {
        const splitedOldValue = lastValidValue.split('.');
        let beforeDot = splitedValue[0] + splitedValue[1];
        // variable for value before the decimal containing a comma. Ex: 1,425
        let beforeDotWithoutComma = beforeDot;

        // if comma exists, remove before comparing length in next if-else statement
        if (beforeDot.includes(',')) {
          const beforeComma = beforeDot.slice(0, beforeDot.indexOf(','));
          const afterComma = beforeDot.slice(beforeDot.indexOf(',') + 1);
          beforeDotWithoutComma = beforeComma + afterComma;
        }
        if (
          (!beforeDot.includes(',') && splitedOldValue[0].length < beforeDot.length) ||
          (beforeDot.includes(',') && splitedOldValue[0].length < beforeDotWithoutComma.length)
        ) {
          // dot is in decimal part
          position -= 1;
          handledValue = beforeDot + '.' + splitedValue[2];
          beforeDot = beforeDot.replace(/,/g, '');
          // prevent replace dot if length before dot is greater then max before dot length
          if (maxBeforeDot && beforeDot.length > maxBeforeDot) {
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

  // enforces props.maxValue and props.minValue
  _enforceValueLimits(data: {
    value: string,
    position: number,
    parts: {
      beforeDot: string,
      afterDot: string
    }
  }) {
    if (!data) return;

    const { minValue, maxValue, enforceMax, enforceMin, maxAfterDot } = this.props;
    const { position } = data;

    // enforce props.maxBeforeDot and props.maxAfterDot
    const valueWithDecimalRestrictions = this._enforceDecimalRestrictions(data);

    // creates floating point number equal to valueWithDecimalRestrictions (string)
    // will be used for value comparisons against props.maxValue and props.minValue if applicable
    const valueWithoutSeparators = parseFloat(valueWithDecimalRestrictions.replace(/,/g, ''));

    // if input value is greater than props.maxValue, throw error
    if (maxValue && valueWithoutSeparators > maxValue) {
      const formattedMaxVal = maxValue.toFixed(maxAfterDot || 6).toString();
      this._setError(`Maximum amount is ${formattedMaxVal}`);

      // if user passes enforceMax=true, restrict input value to props.maxValue
      if (enforceMax) {
        this.setState({ caretPosition: position });
        return formattedMaxVal;
      }
    // if input value is below props.minValue, throw error
    } else if (minValue && valueWithoutSeparators < minValue) {
      const formattedMinVal = minValue.toFixed(maxAfterDot || 6).toString();
      this._setError(`Minimum amount is ${formattedMinVal}`);

      // if props.enforceMin=true, restrict input value to props.minValue
      if (enforceMin) {
        this.setState({ caretPosition: position });
        return formattedMinVal;
      }
      // if input value has no errors, clear state.error
    } else if (this.state.error !== '') {
      this._setError('');
    }

    // update caret in state
    this.setState({ caretPosition: position });

    // input value w/ decimal restrictions is passed along
    // to this._separate without value restrictions
    return valueWithDecimalRestrictions;
  }

  // enforces props.maxBeforeDot and props.maxAfterDot
  _enforceDecimalRestrictions(data: {
    value: string,
    position: number,
    parts: {
      beforeDot: string,
      afterDot: string
    }
  }) {
    const { maxBeforeDot, maxAfterDot } = this.props;
    let { beforeDot } = data.parts;
    let { afterDot } = data.parts;

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
    // if maxAfterDot is 0, drop decimal & numbers after decimal, return int
    if (maxAfterDot === 0) { return beforeDot; }

    // return input value w/decimal restrictions as a string
    return beforeDot + '.' + afterDot;
  }

  _separate(value: string) {
    this.setState({ oldValue: value });
    // value will not contain '.' if maxAfterDot is 0, return early
    if (value && !value.includes('.')) { return value; }
    if (!value) { this.setState({ separatorsCount: 0 }); }
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
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(parseFloat(replacedValue)) && isFinite(replacedValue);
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin,
      theme,
      themeOverrides,
      onChange,
      error,
      context,
      maxValue,
      minValue,
      maxBeforeDot,
      maxAfterDot,
      ...rest
    } = this.props;

    const InputSkin = skin || context.skins[IDENTIFIERS.INPUT];

    return (
      <InputSkin
        error={error || this.state.error}
        inputRef={this.inputElement}
        onChange={this.onChange}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export const NumericInput = withTheme(NumericInputBase);
