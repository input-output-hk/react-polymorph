import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SELECT } from './identifiers';
import InputSkin from './InputSkin';
import Select from '../../components/Select';

class SelectSkin extends Component {

  render() {
    const {
      component, theme, className, options, isOpen,
      placeholder, label, error, isOpeningUpward
    } = this.props;
    const selectedOption = component.getSelectedOption();
    const inputValue = selectedOption ? selectedOption.label : '';
    const highlightedOptionIndex = component.getHighlightedOptionIndex();
    const isFirstOptionHighlighted = highlightedOptionIndex === 0;
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
        <ul
          className={classnames([
            theme.options,
            isFirstOptionHighlighted ? theme.firstOptionHighlighted : null,
          ])}
          ref={(element) => component.registerSkinPart(Select.SKIN_PARTS.OPTIONS, element)}>
          {(isOpeningUpward ? options.slice().reverse() : options).map((option, index) => {
            return (
              <li
                key={index}
                className={classnames([
                  theme.option,
                  component.isSelectedOption(option) ? theme.selectedOption : null,
                  component.isHighlightedOption(index) ? theme.highlightedOption : null,
                ])}
                onClick={(event) => component.handleClickOnOption(option.value, event)}
                onMouseEnter={() => component.setHighlightedOptionIndex(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

};

export default themr(SELECT, null, { withRef: true })(SelectSkin);
