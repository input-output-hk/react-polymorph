// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

// external libraries
import { isString, flow } from 'lodash';

// import utility functions
import { withTheme } from '../themes/withTheme';
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  autoFocus: boolean,
  autoResize: boolean,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  error: string | Element,
  maxLength: number,
  minLength: number,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onRef: Function,
  placeholder: string,
  rows: number,
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

class TextArea extends Component<Props, State> {
  textareaElement: HTMLTextAreaElement;

  static defaultProps = {
    autoFocus: false,
    autoResize: true,
    onRef: () => {},
    theme: null,
    themeId: IDENTIFIERS.TEXT_AREA,
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
      error: ''
    };
  }

  componentDidMount() {
    const { autoResize, autoFocus, onRef } = this.props;

    if (autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
      this._handleAutoresize();
    }

    if (autoFocus) {
      this.focus();
    }

    // if TextArea is rendered by FormField, onRef allows FormField to call
    // TextArea's focus method when someone clicks on FormField's label
    onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.autoResize && nextProps.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
    } else if (this.props.autoResize && !nextProps.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  componentDidUpdate() {
    if (this.props.autoResize) this._handleAutoresize();
  }

  componentWillUnmount() {
    if (this.props.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  focus = () => this.textareaElement.focus();

  onChange = (event: SyntheticInputEvent<>) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;

    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  _setError = (error: string) => this.setState({ error });

  _processValue(value: string) {
    return flow([
      this._enforceStringValue,
      this._enforceMaxLength,
      this._enforceMinLength
    ]).call(this, value);
  }

  _enforceStringValue(value: string) {
    if (!isString(value)) {
      throw new Error('Values passed to TextArea::onChange must be strings');
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

  _handleAutoresize() {
    const { textareaElement } = this;

    if (!textareaElement) return;

    // compute the height difference between inner height and outer height
    const style = getComputedStyle(textareaElement, '');
    const heightOffset =
      style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) +
          parseFloat(style.borderBottomWidth);

    // resize the input to its content size
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight +
      heightOffset}px`;
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: TextAreaSkin,
      theme,
      themeOverrides,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <TextAreaSkin
        error={error || this.state.error}
        onChange={this.onChange}
        textareaRef={el => (this.textareaElement = el)}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default withTheme(TextArea);
