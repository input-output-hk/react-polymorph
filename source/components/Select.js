// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';
import createRef from 'create-react-ref/lib/createRef';

// internal components
import { GlobalListeners } from './HOC/GlobalListeners';
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  allowBlank: boolean,
  autoFocus: boolean,
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  error: string | Element<any>,
  label: string | Element<any>,
  isOpeningUpward: boolean,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  optionRenderer: Function,
  options: Array<{
    isDisabled: boolean,
    value: any
  }>,
  placeholder: string,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  value: string
};

type State = {
  composedTheme: Object,
  isOpen: boolean
};

class SelectBase extends Component<Props, State> {
  rootElement: ?Element<*>;
  inputElement: Element<'input'>;
  optionsElement: ?Element<*>;

  static defaultProps = {
    allowBlank: true,
    autoFocus: false,
    isOpeningUpward: false,
    theme: null,
    themeOverrides: {},
    themeId: IDENTIFIERS.SELECT,
    value: ''
  };

  constructor(props: Props) {
    super(props);

    // define ref
    this.rootElement = createRef();
    this.inputElement = createRef();
    this.optionsElement = createRef();

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      isOpen: false
    };
  }

  componentDidMount() {
    // check for autoFocus of input element
    if (this.props.autoFocus) {
      return this.focus();
    }
  }

  // ========= PUBLIC SKIN API =========

  // applying focus to the input element will
  // toggle options open because Select's input is read only
  focus = () => this.toggleOpen();

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleInputClick = (event: SyntheticMouseEvent<>) => {
    event.stopPropagation();
    event.preventDefault();

    const { inputElement } = this;
    if (inputElement.current && document.activeElement === inputElement.current) {
      inputElement.current.blur();
    }
    this.toggleOpen();
  };

  handleChange = (option: Object, event: SyntheticEvent<>) => {
    // check if the user passed an onChange handler and call it
    if (this.props.onChange) this.props.onChange(option.value, event);
    // onChange is called when an option is selected, so close options
    this.toggleOpen();
  };

  getSelectedOption = () => {
    const { options, value, allowBlank } = this.props;
    for (const option of options) {
      if (option.value === value) return option;
    }
    if (!allowBlank) return options[0];
  };

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: SelectSkin,
      theme,
      themeOverrides,
      autoFocus,
      context,
      allowBlank,
      ...rest
    } = this.props;

    return (
      <GlobalListeners
        toggleOpen={this.toggleOpen}
        optionsIsOpen={this.state.isOpen}
        optionsRef={this.optionsElement}
        rootRef={this.rootElement}
      >
        {() => (
          <SelectSkin
            isOpen={this.state.isOpen}
            rootRef={this.rootElement}
            inputRef={this.inputElement}
            optionsRef={this.optionsElement}
            theme={this.state.composedTheme}
            getSelectedOption={this.getSelectedOption}
            handleInputClick={this.handleInputClick}
            handleChange={this.handleChange}
            toggleOpen={this.toggleOpen}
            {...rest}
          />
        )}
      </GlobalListeners>
    );
  }
}

export const Select = withTheme(SelectBase);
