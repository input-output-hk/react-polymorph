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
import type { InputEvent } from '../utils/types';

type Props = {
  autoFocus?: boolean,
  className?: string,
  context: ThemeContextProp,
  disabled?: boolean,
  error?: string,
  label?: string | Element<any>,
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
  value: ?number,
};

type State = {
  composedTheme: Object,
  minimumFractionDigits: number,
  inputCaretPosition: number,
  fallbackInputValue: string,
};

// TODO: make this configurable (generalize handling commas and dots in other languages!)
const LOCALE = 'en-US';

class NumericInputBase extends Component<Props, State> {

  inputElement: { current: null | ElementRef<'input'> };

  static displayName = 'NumericInput';

  static defaultProps = {
    context: createEmptyContext(),
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
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
    const result = this.processValueChange(event.nativeEvent);
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
  processValueChange(event: InputEvent): ?{
    value: ?number,
    caretPosition: number,
    fallbackInputValue?: string,
    minimumFractionDigits: number,
  } {
    const changedCaretPosition = event.target.selectionStart;
    const valueToProcess = event.target.value;
    const { inputType } = event;
    const { value } = this.props;
    const { fallbackInputValue } = this.state;
    const isBackwardDelete = inputType === 'deleteContentBackward';
    const isForwardDelete = inputType === 'deleteContentForward';
    const deleteCaretCorrection = isBackwardDelete ? 0 : 1;

    /**
     * ========= HANDLE HARD EDGE-CASES =============
     */
    // Case: invalid characters entered -> refuse!
    if (!VALID_INPUT_REGEX.test(valueToProcess)) {
      return {
        caretPosition: changedCaretPosition - 1,
        fallbackInputValue,
        minimumFractionDigits: this.state.minimumFractionDigits,
        value,
      };
    }

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
      value != null ? value.toLocaleString(LOCALE, numberLocaleOptions) : fallbackInputValue
    );
    const currentNumberOfDots = getNumberOfDots(currentValue);
    const hadDotBefore = currentNumberOfDots > 0;

    // New Value
    let newValue = valueToProcess;
    let newCaretPosition = changedCaretPosition;
    const newNumberOfDots = getNumberOfDots(newValue);

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

    newValue = truncateToPrecision(newValue, maximumFractionDigits);

    /**
     * ========= PROCESS CLEANED INPUT =============
     */
    const numberOfFractionDigits = getFractionDigits(newValue).length;
    const dynamicMinimumFractionDigits = Math.min(
      Math.max(propsMinimumFractionDigits, numberOfFractionDigits), maximumFractionDigits
    );
    const newNumber = getValueAsNumber(newValue, maximumFractionDigits);

    // Case: Dot was added at the beginning of number

    if (newValue.charAt(0) === '.') {
      return {
        value: null,
        caretPosition: changedCaretPosition,
        fallbackInputValue: newValue, // render new value as-is
        minimumFractionDigits: dynamicMinimumFractionDigits,
      };
    }

    // Case: Invalid change has been made -> ignore it
    if (newNumber == null) {
      const isDeletion = isForwardDelete || isBackwardDelete;
      const deleteAdjustment = isBackwardDelete ? 0 : 1; // special cases when deleting dot
      const insertAdjustment = -1; // don't move caret if numbers are "inserted"
      return {
        caretPosition: changedCaretPosition + (isDeletion ? deleteAdjustment : insertAdjustment),
        fallbackInputValue,
        minimumFractionDigits: dynamicMinimumFractionDigits,
        value: currentNumber,
      };
    }

    // Case: Dot was added at the end of number

    if (newValue.charAt(newValue.length - 1) === '.') {
      return {
        value: null,
        caretPosition: changedCaretPosition,
        fallbackInputValue: newValue, // render new value as-is
        minimumFractionDigits: 0,
      };
    }

    // Case: Dot was deleted with minimum fraction digits constrain defined
    if (this.getMinimumFractionDigitsProp() != null && hadDotBefore && !newNumberOfDots) {
      return {
        caretPosition: newCaretPosition + deleteCaretCorrection,
        fallbackInputValue: '',
        minimumFractionDigits: dynamicMinimumFractionDigits,
        value: currentNumber,
      };
    }

    // Case: Valid change has been made

    const localizedNewNumber = newNumber.toLocaleString(LOCALE, numberLocaleOptions);
    const hasNumberChanged = value !== newNumber;
    const commasDiff = getNumberOfCommas(localizedNewNumber) - getNumberOfCommas(newValue);
    const haveCommasChanged = commasDiff > 0;
    const onlyCommasChanged = !hasNumberChanged && haveCommasChanged;
    const caretCorrection = onlyCommasChanged ? deleteCaretCorrection : commasDiff;
    return {
      caretPosition: Math.max(newCaretPosition + caretCorrection, 0),
      fallbackInputValue: '',
      minimumFractionDigits: dynamicMinimumFractionDigits,
      value: newNumber,
    };
  }

  getMinimumFractionDigitsProp(): number | null {
    const { numberLocaleOptions } = this.props;
    if (!numberLocaleOptions) return null;
    const { minimumFractionDigits } = numberLocaleOptions;
    return minimumFractionDigits || null;
  }

  getMinimumFractionDigits(): number {
    return this.getMinimumFractionDigitsProp() || 0;
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
    return convertNumberToLocalizedString(value, LOCALE, this.getDynamicLocaleOptions());
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

const VALID_INPUT_REGEX = /^([0-9,\+\-\.]+)?$/;
const NUMERIC_INPUT_REGEX = /^([\+|\-])?([0-9,]+)?(\.([0-9]+)?)?$/;

const isValidNumericInput = (value: string): boolean => NUMERIC_INPUT_REGEX.test(value);

const isParsableNumberString = (value: string, requiredPrecision: number): boolean => (
  // The number of digits is limited in Javascript - so the required precision influence
  // the possible number of integer digits (only 15 digits can be safely represented in total)
  parseFloat(value) >= (Number.MIN_SAFE_INTEGER / 10 ** (requiredPrecision + 1)) &&
  parseFloat(value) <= (Number.MAX_SAFE_INTEGER / 10 ** (requiredPrecision + 1)) &&
  !isNaN(parseFloat(value)) &&
  isFinite(value)
);

const removeCommas = (value: string): string => value.replace(/,/g, '');

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
