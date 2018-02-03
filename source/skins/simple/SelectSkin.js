import React from 'react';

// external libraries
import classnames from 'classnames';

// components
import Options from '../../components/Options';

// skins
import SimpleInputSkin from './InputSkin';
import SimpleOptionsSkin from '../../skins/simple/OptionsSkin';

// themes
import { SimpleInputTheme, SimpleOptionsTheme } from '../../themes/simple';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => {
  const selectedOption = props.getSelectedOption();
  const inputValue = selectedOption ? selectedOption.label : '';

  return (
    <div
      className={classnames([
        props.className,
        props.theme.select,
        props.isOpen ? props.theme.isOpen : null,
        props.isOpeningUpward ? props.theme.openUpward : null
      ])}
    >
      <SimpleInputSkin
        inputRef={props.inputRef}
        className={props.theme.selectInput}
        theme={SimpleInputTheme}
        label={props.label}
        value={inputValue}
        onClick={props.handleInputClick}
        placeholder={props.placeholder}
        error={props.error}
        readOnly
      />
      <Options
        skin={SimpleOptionsSkin}
        theme={SimpleOptionsTheme}
        isOpen={props.isOpen}
        options={props.options}
        isOpeningUpward={props.isOpeningUpward}
        onChange={props.handleChange}
        optionRenderer={props.optionRenderer}
        onClose={props.toggleOpen}
        selectedOptionValue={inputValue}
        noResults={!props.options.length}
      />
    </div>
  );
};
