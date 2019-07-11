// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { ComponentType, SyntheticInputEvent, Element, ElementRef } from 'react';

// external libraries
import createRef from 'create-react-ref/lib/createRef';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';
import { removeCharAtPosition } from '../utils/strings';

type Props = {
  autoFocus?: boolean,
  className?: string,
  context: ThemeContextProp,
  disabled?: boolean,
  error?: string,
  label?: string | Element<any>,
  locale: string,
  numberLocaleOptions?: Number$LocaleOptions,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  placeholder?: string,
  readOnly?: boolean,
  skin?: ComponentType<any>,
  theme: ?Object,
  themeId: string,
  themeOverrides: Object,
  useDynamicDigitCalculation: boolean,
  value: ?number,
};

type State = {
  composedTheme: Object,
  minimumFractionDigits: number,
  inputCaretPosition: number,
  fallbackInputValue: string,
};

class NumericInputBase extends Component<Props, State> {

  inputElement: { current: null | ElementRef<'input'> };

  static displayName = 'NumericInput';

  static defaultProps = {
    context: createEmptyContext(),
    locale: 'en-US',
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
    useDynamicDigitCalculation: false,
    value: null,
  };

  constructor(props: Props) {
    super(props);
    const { context, numberLocaleOptions, themeId, theme, themeOverrides } = props;
    this.inputElement = createRef();
    const minimumFractionDigits = (
      numberLocaleOptions ? numberLocaleOptions.minimumFractionDigits : 0
    );
    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      minimumFractionDigits: minimumFractionDigits || 0,
      inputCaretPosition: 0,
      fallbackInputValue: '',
    };
  }

  componentDidMount() {
    const { inputElement } = this;
    const { autoFocus } = this.props;
    if (autoFocus) {
      this.focus();
      if (inputElement && inputElement.current) {
        this.setState({
          inputCaretPosition: inputElement.current.selectionStart
        });
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  componentDidUpdate() {
    this.setInputCaretPosition(this.state.inputCaretPosition);
  }

  onChange = (event: SyntheticInputEvent<Element<'input'>>) => {
    event.preventDefault();
    const { value, onChange, disabled } = this.props;
    if (disabled) { return; }
    const { selectionStart } = event.target;
    const newValue = event.target.value;
    const result = this.processValueChange(newValue, selectionStart);
    if (result) {
      const hasValueChanged = value !== result.value;
      if (hasValueChanged && onChange) {
        onChange(result.value, event);
      }
      this.setState({
        inputCaretPosition: result.caretPosition,
        minimumFractionDigits: result.minimumFractionDigits,
        fallbackInputValue: result.fallbackInputValue,
      });
    }
  };

  /**
   * 1. Handle edge cases that don't need further processing
   * 2. Clean the given value
   * 3. Final processing
   */
  processValueChange(valueToProcess: string, changedCaretPosition: number): ?{
    value: ?number,
    caretPosition: number,
    fallbackInputValue?: string,
    minimumFractionDigits: number,
  } {
    const { value, locale, useDynamicDigitCalculation } = this.props;
    const { fallbackInputValue } = this.state;

    /**
     * ========= HANDLE EDGE-CASES =============
     */

    // Case: Everything was deleted -> reset state
    if (valueToProcess === '') {
      return {
        value: null,
        caretPosition: 0,
        fallbackInputValue: '',
        minimumFractionDigits: 0,
      };
    }

    // Case: value is the same as the fallback (which is always shown if defined)
    if (valueToProcess === this.state.fallbackInputValue) return null;

    // Case: Just minus sign was entered
    if (valueToProcess === '-') {
      return {
        value: null,
        caretPosition: 1,
        fallbackInputValue: valueToProcess, // render standalone minus sign
        minimumFractionDigits: 0,
      };
    }

    /**
     * ========= CLEAN THE INPUT =============
     */

    // Options
    const propsMinimumFractionDigits = this.getMinimumFractionDigits();
    const maximumFractionDigits = this.getMaximumFractionDigits();
    const numberLocaleOptions = this.getDynamicLocaleOptions();

    // Current value
    const currentNumber = value;
    const currentValue = (
      value != null ? value.toLocaleString(locale, numberLocaleOptions) : fallbackInputValue
    );
    const currentNumberOfDots = getNumberOfDots(currentValue);
    const hadDotBefore = currentNumberOfDots > 0;

    // New Value
    let newValue = valueToProcess;
    let newCaretPosition = changedCaretPosition;
    const newNumberOfDots = getNumberOfDots(newValue);
    const hasDotsNow = newNumberOfDots > 0;

    // Case: A second decimal point was added somewhere
    if (hadDotBefore && newNumberOfDots === 2) {
      const oldFirstDotIndex = currentValue.indexOf('.');
      const newFirstDotIndex = newValue.indexOf('.');
      const wasDotAddedBeforeOldOne = newFirstDotIndex < oldFirstDotIndex;
      // Remove the second decimal point and set caret position
      newValue = removeCharAtPosition(
        newValue,
        wasDotAddedBeforeOldOne ? newValue.lastIndexOf('.') : oldFirstDotIndex
      );
      newCaretPosition = newValue.indexOf('.') + 1;
    }

    // Add leading zero if dot was inserted at start
    if (newValue.charAt(0) === '.') {
      newValue = '0' + newValue;
    }

    // Case: Dot was added at the end of number
    if (newValue.charAt(newValue.length - 1) === '.') {
      return {
        value: null,
        caretPosition: changedCaretPosition,
        fallbackInputValue: newValue, // render dot at the end
        minimumFractionDigits: 0,
      };
    }

    newValue = truncateToPrecision(newValue, maximumFractionDigits);

    /**
     * ========= PROCESS CLEANED INPUT =============
     */
    const numberOfFractionDigits = getFractionDigits(newValue).length;
    const dynamicMinimumFractionDigits = Math.min(
      Math.max(propsMinimumFractionDigits, numberOfFractionDigits), maximumFractionDigits
    );
    const dynamicMaxFractionDigits = Math.max(
      dynamicMinimumFractionDigits, numberOfFractionDigits
    );
    const fractionDigits = (
      useDynamicDigitCalculation ? dynamicMaxFractionDigits : maximumFractionDigits
    );
    const newNumber = getValueAsNumber(newValue, fractionDigits);

    // Case: Invalid change has been made -> ignore it

    if (newNumber == null) {
      return {
        caretPosition: changedCaretPosition - 1,
        fallbackInputValue,
        minimumFractionDigits: dynamicMinimumFractionDigits,
        value: currentNumber,
      };
    }

    // Case: Valid change has been made

    const localizedNewNumber = newNumber.toLocaleString(locale, numberLocaleOptions);
    const numberOfCommasDiff = (
      getNumberOfCommas(localizedNewNumber) - getNumberOfCommas(newValue)
    );
    return {
      caretPosition: Math.max(newCaretPosition + numberOfCommasDiff, 0),
      fallbackInputValue: '',
      minimumFractionDigits: dynamicMinimumFractionDigits,
      value: newNumber,
    };
  }

  getMinimumFractionDigits(): number {
    const { numberLocaleOptions } = this.props;
    const minimumFractionDigitsProp = (
      numberLocaleOptions ? numberLocaleOptions.minimumFractionDigits : null
    );
    return minimumFractionDigitsProp || 0;
  }

  getDynamicMinimumFractionDigits(): number {
    const minimumFractionDigitsProp = this.getMinimumFractionDigits();
    return Math.max(this.state.minimumFractionDigits, minimumFractionDigitsProp || 0);
  }

  getMaximumFractionDigits(): number {
    const { numberLocaleOptions } = this.props;
    const minimumFractionDigits = this.getDynamicMinimumFractionDigits();
    const maximumFractionDigits = (
      numberLocaleOptions && numberLocaleOptions.maximumFractionDigits != null
    ) ? numberLocaleOptions.maximumFractionDigits : 3;
    return Math.max(minimumFractionDigits, maximumFractionDigits);
  }

  getDynamicLocaleOptions(): Number$LocaleOptions {
    return Object.assign({}, this.props.numberLocaleOptions, {
      minimumFractionDigits: this.getDynamicMinimumFractionDigits(),
    });
  }

  getLocalizedNumber(value: ?number) {
    const { locale } = this.props;
    return convertNumberToLocalizedString(value, locale, this.getDynamicLocaleOptions());
  }

  setInputCaretPosition = (position: number) => {
    const { inputElement } = this;
    if (!inputElement.current) return;
    const input = inputElement.current;
    input.selectionStart = position;
    input.selectionEnd = position;
  };

  focus = () => {
    const { inputElement } = this;
    if (!inputElement.current) return;
    inputElement.current.focus();
  };

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      context,
      error,
      locale,
      numberLocaleOptions,
      onChange,
      skin,
      theme,
      themeOverrides,
      value,
      ...rest
    } = this.props;

    const InputSkin = skin || context.skins[IDENTIFIERS.INPUT];

    const inputValue = value != null ?
      this.getLocalizedNumber(value) :
      this.state.fallbackInputValue;

    return (
      <InputSkin
        error={error}
        inputRef={this.inputElement}
        onChange={this.onChange}
        theme={this.state.composedTheme}
        value={inputValue}
        {...rest}
      />
    );
  }
}

export const NumericInput = withTheme(NumericInputBase);

// ========= HELPERS ==========

const NUMERIC_INPUT_REGEX = /^([\+|\-])?([0-9,]+)?(\.([0-9]+)?)?$/;

const isValidNumericInput = (value: string): boolean => NUMERIC_INPUT_REGEX.test(value);

const isParsableNumberString = (value: string, requiredPrecision: number): boolean => (
  // The number of digits is limited in Javascript - so the required precision influence
  // the possible number of integer digits (only 15 digits can be safely represented in total)
  parseFloat(value) >= (Number.MIN_SAFE_INTEGER / 10 ** requiredPrecision) &&
  parseFloat(value) <= (Number.MAX_SAFE_INTEGER / 10 ** requiredPrecision) &&
  !isNaN(parseFloat(value)) &&
  isFinite(value)
);

const removeCommas = (value: string): string => value.replace(/,/g, '');

const removeDots = (value: string): string => value.replace(/\./g, '');

const removeTrailingZeros = (value: string) => value.replace(/0+$/g, '');

function parseStringToNumber(value: string, requiredPrecision: number): ?number {
  const cleanedValue = removeCommas(value);
  if (!isValidNumericInput(cleanedValue)) return null;
  if (!isParsableNumberString(cleanedValue, requiredPrecision)) return null;
  return parseFloat(cleanedValue);
}

function convertNumberToLocalizedString(
  num: ?number, locale: string, options?: Number$LocaleOptions
): string {
  return num != null ? num.toLocaleString(locale, options) : '';
}

function getValueAsNumber(value: string | number, requiredPrecision: number): ?number {
  return typeof value === 'string' ? parseStringToNumber(value, requiredPrecision) : value;
}

function getNumberOfCommas(value: string): number {
  return (value.match(/,/g) || []).length;
}

function getNumberOfDots(value: string): number {
  return (value.match(/\./g) || []).length;
}

function getIntegerDigits(value: string): string {
  const decimalPointIndex = value.indexOf('.');
  if (decimalPointIndex === -1) return value;
  return value.substring(0, decimalPointIndex);
}

function getFractionDigits(value: string): string {
  const decimalPointIndex = value.indexOf('.');
  if (decimalPointIndex === -1) return '';
  return value.substring(decimalPointIndex + 1);
}

function truncateToPrecision(value: string, precision: number): string {
  const decimalPointIndex = value.indexOf('.');
  if (decimalPointIndex === -1) return value;
  const fractionDigits = removeCommas(getFractionDigits(value));
  return getIntegerDigits(value) + '.' + fractionDigits.substring(0, precision);
}

function normalizeValue(value: string) {
  return removeDots(removeTrailingZeros(removeCommas(value)));
}
