import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SELECT } from './identifiers';
import InputSkin from './InputSkin';
import Select from '../../components/Select';

class SelectSkin extends Component {

  state = {
    isFirstOptionHovered: false,
  };

  render() {
    const {
      component, theme, className, options, isOpen,
      placeholder, label, error, isOpeningUpward
    } = this.props;
    const { isFirstOptionHovered } = this.state;
    const selectedOption = component.getSelectedOption();
    const inputValue = selectedOption ? selectedOption.label : '';
    return (
      <div
        className={classnames([
          className,
          theme.select,
          isOpen ? theme.isOpen : null,
          isOpeningUpward ? theme.openUpward : null,
        ])}
        ref={(element) => component.registerSkinPart(Select.SKIN_PARTS.ROOT, element)}
      >
        <InputSkin
          className={theme.selectInput}
          label={label}
          value={inputValue}
          onClick={component.handleInputClick}
          component={component}
          placeholder={placeholder}
          error={error}
          readOnly
        />
        {isOpen && (
          <ul
            className={classnames([
              theme.options,
              isFirstOptionHovered ? theme.firstOptionHovered : null,
            ])}
            ref={(element) => component.registerSkinPart(Select.SKIN_PARTS.OPTIONS, element)}>
            {(isOpeningUpward ? options.slice().reverse() : options).map((option, index) => {
              // Observe hover state for first option to allow fine grained css styles (e.g css arrow)
              const firstItemIndex = isOpeningUpward ? (options.length - 1) : 0;
              const hoverProps = index !== firstItemIndex ? {} : {
                onMouseOver: () => this.setState({ isFirstOptionHovered: true }),
                onMouseOut: () => this.setState({ isFirstOptionHovered: false }),
              };
              return <li
                key={index}
                className={classnames([
                  theme.option,
                  component.isSelectedOption(option) ? theme.selectedOption : null,
                ])}
                onClick={(event) => component.handleClickOnOption(option.value, event)}
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

export default themr(SELECT, null, { withRef: true })(SelectSkin);
