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
    const result = this.processValueChange(event.target.value, selectionStart);

    if (result) {
      const hasValueChanged = value !== result.value;
      if (hasValueChanged && onChange) {
        onChange(result.value, event);
      }
      this.setState({
        inputCaretPosition: result.caretPosition,
        minimumFractionDigits: result.minimumFractionDigits,
        fallbackInputValue: result.fallbackInputValue || '',
      });
    }
  };

  processValueChange(changedValue: string, newCaretPosition: number): ?{
    value: ?number,
    caretPosition: number,
    fallbackInputValue?: string,
    minimumFractionDigits: number,
  } {
    const { value, locale } = this.props;

    if (changedValue !== '' && changedValue === this.state.fallbackInputValue) return null;

    // Options
    const minimumFractionDigits = this.getMinimumFractionDigits();
    const maximumFractionDigits = this.getMaximumFractionDigits();
    const numberLocaleOptions = this.getDynamicLocaleOptions();

    // Current value
    const currentNumber = value;
    const currentValue = value != null ? value.toLocaleString(locale, numberLocaleOptions) : '';
    const currentNumberOfDots = getNumberOfDots(currentValue);
    const hadDotBefore = currentNumberOfDots > 0;

    // New value
    const newValue = truncateToPrecision(changedValue, maximumFractionDigits);
    const newNumberOfDots = getNumberOfDots(newValue);
    const hasDotsNow = newNumberOfDots > 0;

    // Case: Everything was deleted -> reset everything
    if (newValue === '') {
      return {
        value: null,
        caretPosition: 0,
        fallbackInputValue: '',
        minimumFractionDigits: 0,
      };
    }

    // Case: Just minus sign was entered
    if (newValue === '-') {
      return {
        value: null,
        caretPosition: 1,
        fallbackInputValue: newValue, // render standalone minus sign
        minimumFractionDigits: 0,
      };
    }

    // Case: One additional decimal point was added somewhere
    if (hadDotBefore && newNumberOfDots === 2) {
      const oldFirstDotIndex = currentValue.indexOf('.');
      const newFirstDotIndex = newValue.indexOf('.');
      const wasDotAddedBeforeOldOne = newFirstDotIndex < oldFirstDotIndex;
      const newCleanedValue = removeCharAtPosition(
        newValue,
        wasDotAddedBeforeOldOne ? newValue.lastIndexOf('.') : oldFirstDotIndex
      );
      return {
        value: getValueAsNumber(newCleanedValue),
        caretPosition: newCleanedValue.indexOf('.') + 1,
        minimumFractionDigits
      };
    }

    // Case: Decimal point was deleted -> remove dynamic minimum fraction digits
    if (hadDotBefore && !hasDotsNow) {
      return {
        value: getValueAsNumber(newValue),
        caretPosition: currentValue.indexOf('.') + 1,
        minimumFractionDigits: 0,
      };
    }

    // Case: Dot was added to integer number -> ensure that we show at least one fraction digit
    if (!hadDotBefore && hasDotsNow) {
      return {
        value: getValueAsNumber(newValue),
        caretPosition: newValue.indexOf('.') + 1,
        minimumFractionDigits: 1,
      };
    }

    // Case: A comma was deleted -> jump cursor over comma
    if (getNumberOfCommas(newValue) < getNumberOfCommas(currentValue)) {
      return {
        value: currentNumber,
        caretPosition: newCaretPosition,
        minimumFractionDigits
      };
    }

    // Case: Number digits have been changed
    const newNumber = getValueAsNumber(newValue);
    if (newNumber != null) {
      // Take the localized formatting into account for the caret position
      const localizedNewNumber = newNumber.toLocaleString(locale, numberLocaleOptions);
      const numberOfCommasDiff = (
        getNumberOfCommas(localizedNewNumber) - getNumberOfCommas(newValue)
      );
      return {
        value: newNumber,
        caretPosition: Math.max(newCaretPosition + numberOfCommasDiff, 0),
        minimumFractionDigits
      };
    }

    // Case: Invalid change has been made -> ignore it
    return {
      value: currentNumber,
      caretPosition: newCaretPosition,
      minimumFractionDigits
    };
  }

  getMinimumFractionDigits(): number {
    const { numberLocaleOptions } = this.props;
    const minimumFractionDigitsProp = (
      numberLocaleOptions ? numberLocaleOptions.minimumFractionDigits : null
    );
    return Math.max(this.state.minimumFractionDigits, minimumFractionDigitsProp || 0);
  }

  getMaximumFractionDigits(): number {
    const { numberLocaleOptions } = this.props;
    if (numberLocaleOptions && numberLocaleOptions.maximumFractionDigits != null) {
      return numberLocaleOptions.maximumFractionDigits;
    }
    return 3; // default
  }

  getDynamicLocaleOptions(): Number$LocaleOptions {
    return Object.assign({}, this.props.numberLocaleOptions, {
      minimumFractionDigits: this.getMinimumFractionDigits(),
    });
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
      convertNumberToLocalizedString(value, locale, this.getDynamicLocaleOptions()) :
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

const isParsableNumberString = (value: string): boolean => (
  parseFloat(value) >= Number.MIN_SAFE_INTEGER &&
  parseFloat(value) <= Number.MAX_SAFE_INTEGER &&
  !isNaN(parseFloat(value)) &&
  isFinite(value)
);

const removeCommas = (value: string): string => value.replace(/,/g, '');

function parseStringToNumber(value: string): ?number {
  const cleanedValue = removeCommas(value);
  if (!isValidNumericInput(cleanedValue)) return null;
  if (!isParsableNumberString(cleanedValue)) return null;
  return parseFloat(cleanedValue);
}

function convertNumberToLocalizedString(
  num: ?number, locale: string, options?: Number$LocaleOptions
): string {
  return num != null ? num.toLocaleString(locale, options) : '';
}

function getValueAsNumber(value: string | number): ?number {
  return typeof value === 'string' ? parseStringToNumber(value) : value;
}

function getNumberOfCommas(value: string): number {
  return (value.match(/,/g) || []).length;
}

function getNumberOfDots(value: string): number {
  return (value.match(/\./g) || []).length;
}

function truncateToPrecision(value: string, precision: number): string {
  const decimalPointIndex = value.indexOf('.');
  return decimalPointIndex !== -1 ? value.substring(0, decimalPointIndex + precision + 1) : value;
}
