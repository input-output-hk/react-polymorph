import React from "react";

// external libraries
import classnames from "classnames";

// components
import { Options } from "../../components";

// skins
import { InputSkin, OptionsSkin } from "./";

// themes
import { InputTheme, OptionsTheme } from "../../themes/simple";

// internal utility functions
import { pickDOMProps } from "../../utils";

export default props => {
  const selectedOption = props.getSelectedOption();
  const inputValue = selectedOption ? selectedOption.label : "";

  return (
    <div
      className={classnames([
        props.className,
        props.theme.select,
        props.isOpen ? props.theme.isOpen : null,
        props.isOpeningUpward ? props.theme.openUpward : null
      ])}
    >
      <InputSkin
        inputRef={props.inputRef}
        className={props.theme.selectInput}
        theme={InputTheme}
        label={props.label}
        value={inputValue}
        onClick={props.handleInputClick}
        placeholder={props.placeholder}
        error={props.error}
        readOnly
      />
      <Options
        skin={OptionsSkin}
        theme={OptionsTheme}
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
