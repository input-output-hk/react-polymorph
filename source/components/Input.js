// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { ComponentType, Element, SyntheticInputEvent } from 'react';
import { isString, flow } from 'lodash';

// internal utility functions
import { withTheme } from '../themes/withTheme';
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  autoFocus: boolean,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  error: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onRef: Function,
  maxLength: number,
  minLength: number,
  onKeyPress: Function,
  placeholder: string,
  readOnly: boolean,
  setError: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  value: string
};

type State = {
  error: string,
  composedTheme: Object
};

class Input extends Component<Props, State> {
  inputElement: Element<'input'>;

  static defaultProps = {
    autoFocus: false,
    error: '',
    onRef: () => {},
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.INPUT,
    themeOverrides: {},
    value: ''
  };

  constructor(props: Props) {
    super(props);

    // $FlowFixMe
    this.inputElement = React.createRef();

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      error: ''
    };
  }

  componentDidMount() {
    const { onRef, autoFocus } = this.props;

    if (autoFocus) this.focus();

    // if Input is rendered by FormField, onRef allows FormField to call
    // Input's focus method when someone clicks on FormField's label
    onRef(this);
  }

  onChange = (event: SyntheticInputEvent<Element<'input'>>) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;

    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  focus = () => {
    const { inputElement } = this;
    if (inputElement && inputElement.current) {
      return inputElement.current.focus();
    }
  }

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
      this._enforceMinLength
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
      skin: InputSkin,
      context,
      theme,
      themeOverrides,
      onChange,
      error,
      onRef,
      maxLength,
      minLength,
      setError,
      autoFocus,
      ...rest
    } = this.props;

    return (
      <InputSkin
        error={error || this.state.error}
        onChange={this.onChange}
        inputRef={this.inputElement}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default withTheme(Input);
