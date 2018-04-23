import React, { Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SELECT } from '../identifiers';
import RawInputSkin from './InputSkin';
import Select from '../../../components/Select';
import Options from '../../../components/Options';
import RawSimpleOptionsSkin from './OptionsSkin';

export const selectSkinFactory = (InputSkin, OptionsSkin) => (

  class SelectSkin extends Component {

    render() {
      const {
        component, theme, className, options, optionRenderer, isOpen,
        placeholder, label, error, isOpeningUpward,
      } = this.props;
      const selectedOption = component.getSelectedOption();
      const selectedValue = selectedOption ? selectedOption.value : null;
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
          >
            <Options
              isOpen={isOpen}
              options={options}
              skin={<OptionsSkin />}
              isOpeningUpward={isOpeningUpward}
              onChange={component.handleChange}
              optionRenderer={optionRenderer}
              onClose={component.onCloseOptions}
              selectedOptionValue={selectedValue}
              noResults={!options.length}
            />
          </InputSkin>
        </div>
      );
    }

  }
);

export default themr(SELECT)(selectSkinFactory(RawInputSkin, RawSimpleOptionsSkin));
