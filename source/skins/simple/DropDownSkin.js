import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { DROP_DOWN } from './identifiers';
import InputSkin from './InputSkin';
import DropDown from '../../components/DropDown';

class DropDownSkin extends Component {

  state = {
    isFirstOptionHovered: false,
  };

  render() {
    const { component, theme, className, options, isOpen } = this.props;
    const selectedOption = component.getSelectedOption();
    const inputValue = selectedOption ? selectedOption.label : '';
    return (
      <div
        className={classnames([
          className,
          theme.dropDown,
          isOpen ? theme.isOpen : null,
        ])}
        ref={(element) => component.registerSkinPart(DropDown.SKIN_PARTS.ROOT, element)}
      >
        <InputSkin
          className={theme.dropDownInput}
          value={inputValue}
          onClick={component.handleInputClick}
          component={component}
          readOnly
        />
        {isOpen && (
          <ul
            className={classnames([
              theme.options,
              this.state.isFirstOptionHovered ? theme.firstOptionHovered : null,
            ])}
            ref={(element) => component.registerSkinPart(DropDown.SKIN_PARTS.OPTIONS, element)}>
            {options.map((option, index) => {
              // Observe hover state for first option to allow fine grained css styles (e.g css arrow)
              const hoverProps = index !== 0 ? {} : {
                onMouseOver: () => this.setState({ isFirstOptionHovered: true }),
                onMouseOut: () => this.setState({ isFirstOptionHovered: false }),
              };
              return <li
                key={index}
                className={classnames([
                  theme.option,
                  component.isSelectedOption(option) ? theme.selectedOption : null,
                ])}
                onClick={(event) => component.handleSelect(option.value, event)}
                {...hoverProps}
              >
                {option.label}
              </li>;
            })}
          </ul>
        )}
      </div>
    );
  }
};

export default themr(DROP_DOWN, null, { withRef: true })(DropDownSkin);
