// @flow
import React, { Component, RefObject } from 'react';
// $FlowFixMe
import type { ComponentType, Element, SyntheticInputEvent } from 'react';

// external libraries
import createRef from 'create-react-ref/lib/createRef';
import { isString, flow } from 'lodash';

// utilities
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

export type InputProps = {
  autoFocus: boolean,
  className?: ?string,
  context: ThemeContextProp,
  disabled?: boolean,
  error?: string | Element<any>,
  hasSearch?: boolean,
  inputRef?: RefObject,
  label?: string | Element<any>,
  maxLength?: number,
  minLength?: number,
  onChange?: Function,
  onSearch?: Function,
  placeholder?: string,
  readOnly: boolean,
  searchList: Array<string>,
  selectedOption?: any,
  selectionRenderer?: Function,
  setError?: Function,
  showErrorState?: boolean,
  skin?: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  value: string,
};

type State = {
  error: string,
  composedTheme: Object,
};

class InputBase extends Component<InputProps, State> {
  inputElement: RefObject;

  static displayName = 'Input';

  static defaultProps = {
    autoFocus: false,
    context: createEmptyContext(),
    error: '',
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
    value: '',
  };

  constructor(props: InputProps) {
    super(props);
    this.inputElement = props.inputRef ?? createRef();
    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      error: '',
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) this.focus();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      didThemePropsChange(prevProps, this.props, this.setState.bind(this));
    }
  }

  onChange = (event: SyntheticInputEvent<Element<'input'>>) => {
    const { onChange, disabled, readOnly } = this.props;
    if (disabled || readOnly) return;
    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  onSearch = (value: string) => {
    console.log('search: ', value);
  };

  focus = () => {
    const { inputElement } = this;
    if (!inputElement.current) return;
    inputElement.current.focus();
  };

  _setError = (error: string) => {
    const { setError } = this.props;

    // checks for setError func from FormField component
    // if this Input instance is being used within the render function
    // of a FormField instance, the error field within FormField's local state
    // will be set
    if (setError) setError(error);
    this.setState({ error });
  };

  _processValue(value: string) {
    return flow([
      this._enforceStringValue,
      this._enforceMaxLength,
      this._enforceMinLength,
    ]).call(this, value);
  }

  _enforceStringValue(value) {
    if (!isString(value)) {
      throw new Error('Values passed to Input::onChange must be strings');
    }
    return value;
  }

  _enforceMaxLength(value: string) {
    const { maxLength } = this.props;
    const isTooLong = maxLength != null && value.length > maxLength;
    return isTooLong ? value.substring(0, maxLength) : value;
  }

  _enforceMinLength(value: string) {
    const { minLength } = this.props;
    const isTooShort = minLength != null && value.length < minLength;

    if (isTooShort) {
      this._setError('Please enter a valid input');
    } else if (this.state.error !== '') {
      this._setError('');
    }

    return value;
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin,
      context,
      theme,
      themeOverrides,
      onChange,
      onSearch,
      error,
      maxLength,
      minLength,
      setError,
      autoFocus,
      ...rest
    } = this.props;

    const InputSkin = skin || context.skins[IDENTIFIERS.INPUT];

    return (
      <InputSkin
        error={error || this.state.error}
        onChange={this.onChange}
        onSearch={this.onSearch}
        inputRef={this.inputElement}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export const Input = withTheme(InputBase);
