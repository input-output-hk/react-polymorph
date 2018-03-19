import React from "react";

// external libraries
import classnames from "classnames";

// components
import { Options, Input } from "../../components";

// skins
import { InputSkin, OptionsSkin } from "./";

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
      <div className={props.theme.selectInput}>
        <Input
          skin={InputSkin}
          inputRef={props.inputRef}
          label={props.label}
          value={inputValue}
          onClick={props.handleInputClick}
          placeholder={props.placeholder}
          error={props.error}
          readOnly
        />
      </div>
      <Options
        skin={OptionsSkin}
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
