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
  allowSigns?: boolean,
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
  fallbackInputValue: ?string,
};

// TODO: make this configurable (generalize handling commas and dots in other languages!)
const LOCALE = 'en-US';

class NumericInputBase extends Component<Props, State> {

  inputElement: { current: null | ElementRef<'input'> };
  _hasInputBeenChanged: boolean = false;

  static displayName = 'NumericInput';

  static defaultProps = {
    allowSigns: true,
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
      fallbackInputValue: null,
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { value } = this.props;
    const { inputCaretPosition } = this.state;
    const hasValueBeenChanged = value !== prevProps.value;
    const hasCaretBeenChanged = inputCaretPosition !== prevState.inputCaretPosition;
    if (this._hasInputBeenChanged || hasValueBeenChanged || hasCaretBeenChanged) {
      this.setInputCaretPosition(inputCaretPosition);
    }
    this._hasInputBeenChanged = false;
  }

  onChange = (event: SyntheticInputEvent<Element<'input'>>) => {
    event.preventDefault();
    const { value, onChange, disabled } = this.props;
    if (disabled) { return; }
    const result = this.processValueChange(event.nativeEvent);
    if (result) {
      this._hasInputBeenChanged = true;
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
    fallbackInputValue?: ?string,
    minimumFractionDigits: number,
  } {
    const changedCaretPosition = event.target.selectionStart;
    const valueToProcess = event.target.value;
    const { inputType } = event;
    const { value, allowSigns } = this.props;
    const fallbackInputValue = this.state.fallbackInputValue || '';
    const isBackwardDelete = inputType === 'deleteContentBackward';
    const isForwardDelete = inputType === 'deleteContentForward';
    const isDeletion = isForwardDelete || isBackwardDelete;
    const isInsert = inputType === 'insertText';
    const deleteCaretCorrection = isBackwardDelete ? 0 : 1;
    const validInputRegex = allowSigns ? VALID_INPUT_SIGNS_REGEX : VALID_INPUT_NO_SIGNS_REGEX;
    const valueHasLeadingZero = /^0[1-9]/.test(valueToProcess);

    /**
     * ========= HANDLE HARD EDGE-CASES =============
     */
    // Case: invalid characters entered -> refuse!
    if (!validInputRegex.test(valueToProcess)) {
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
        fallbackInputValue: null,
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
        fallbackInputValue: '-',
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

    // Case: Just a dot was entered
    if (valueToProcess === '.') {
      const hasMinFractions = dynamicMinimumFractionDigits > 0;
      return {
        value: 0,
        caretPosition: 2,
        fallbackInputValue: hasMinFractions ? null : '0.',
        minimumFractionDigits: dynamicMinimumFractionDigits,
      };
    }

    // Case: Dot was added at the beginning of number
    if (newValue.charAt(0) === '.') {
      const newCaretPos = isInsert ? 2 : 1;
      return {
        value: newNumber,
        caretPosition: newCaretPos,
        minimumFractionDigits: dynamicMinimumFractionDigits,
      };
    }

    // Case: Invalid change has been made -> ignore it
    if (newNumber == null) {
      const deleteAdjustment = isBackwardDelete ? 0 : 1; // special cases when deleting dot
      const insertAdjustment = -1; // don't move caret if numbers are "inserted"
      return {
        caretPosition: changedCaretPosition + (isDeletion ? deleteAdjustment : insertAdjustment),
        fallbackInputValue,
        minimumFractionDigits: dynamicMinimumFractionDigits,
        value: currentNumber,
      };
    }

    const localizedNewNumber = newNumber.toLocaleString(LOCALE, {
      minimumFractionDigits: dynamicMinimumFractionDigits,
    });

    // Case: Dot was added at the end of number
    if (!isDeletion && newValue.charAt(newValue.length - 1) === '.') {
      return {
        value: newNumber,
        caretPosition: changedCaretPosition,
        fallbackInputValue: propsMinimumFractionDigits > 0 ? null : localizedNewNumber + '.',
        minimumFractionDigits: 0,
      };
    }

    // Case: Dot was deleted with minimum fraction digits constrain defined
    const hasFractions = this.getMinimumFractionDigitsProp() != null;
    const wasDotRemoved = hadDotBefore && !newNumberOfDots;
    if (wasDotRemoved && hasFractions && !isInsert) {
      return {
        caretPosition: newCaretPosition + deleteCaretCorrection,
        fallbackInputValue: null,
        minimumFractionDigits: dynamicMinimumFractionDigits,
        value: currentNumber,
      };
    }

    // Case: Valid change has been made
    const hasNumberChanged = value !== newNumber;
    const commasDiff = getNumberOfCommas(localizedNewNumber) - getNumberOfCommas(newValue);
    const haveCommasChanged = commasDiff > 0;
    const onlyCommasChanged = !hasNumberChanged && haveCommasChanged;
    const leadingZeroCorrection = valueHasLeadingZero ? -1 : 0;
    const caretCorrection = (
      onlyCommasChanged ? deleteCaretCorrection : commasDiff
    ) + leadingZeroCorrection;
    return {
      caretPosition: Math.max(newCaretPosition + caretCorrection, 0),
      fallbackInputValue: null,
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

  onBlur = () => {
    this.setState({
      fallbackInputValue: null,
    });
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

    const localizedInput = value != null ? this.getLocalizedNumber(value) : '';
    const inputValue = this.state.fallbackInputValue ?
      this.state.fallbackInputValue :
      localizedInput;

    return (
      <InputSkin
        error={error}
        inputRef={this.inputElement}
        onChange={this.onChange}
        theme={this.state.composedTheme}
        value={inputValue}
        onBlur={this.onBlur}
        {...rest}
      />
    );
  }
}

export const NumericInput = withTheme(NumericInputBase);

// ========= HELPERS ==========

const VALID_INPUT_SIGNS_REGEX = /^([-])?([0-9,.]+)?$/;
const VALID_INPUT_NO_SIGNS_REGEX = /^([0-9,.]+)?$/;
const NUMERIC_INPUT_REGEX = /^([-])?([0-9,]+)?(\.([0-9]+)?)?$/;

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
