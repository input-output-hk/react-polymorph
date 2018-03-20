import React from "react";

// external libraries
import _ from "lodash";
import classnames from "classnames";

// components
import { FormField, Options } from "../../components";

// skins
import { FormFieldSkin, OptionsSkin } from "./";

export default props => {
  const { label, error, theme, themeId } = props;
  const formfieldProps = { label, error };

  const filteredAndLimitedOptions = _.slice(
    props.filteredOptions,
    0,
    props.maxVisibleOptions
  );

  const isFirstOptionHighlighted = props.highlightedOptionIndex === 0;

  // show placeholder only if no maximum selections declared or maximum not reached
  const canMoreOptionsBeSelected =
    props.selectedOptions.length < props.maxSelections;

  let placeholder =
    !props.maxSelections || canMoreOptionsBeSelected ? props.placeholder : "";

  let selectedOptions =
    props.selectedOptions &&
    props.selectedOptions.map((selectedOption, index) => {
      return (
        <span className={theme[themeId].selectedWordBox} key={index}>
          <span className={theme[themeId].selectedWordValue}>
            {selectedOption}
            <span
              className={theme[themeId].selectedWordRemoveButton}
              onClick={props.removeOption.bind(null, index)}
            >
              &times;
            </span>
          </span>
        </span>
      );
    });

  // selected words and input for enter new one
  const autocompleteContent = (
    <div className={theme[themeId].selectedWords}>
      {selectedOptions}
      <input
        ref={props.inputRef}
        placeholder={placeholder}
        value={props.inputValue}
        onChange={props.handleInputChange}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );

  return (
    <div className={props.className} ref={props.rootRef}>
      <FormField
        error={props.error}
        label={props.label}
        skin={FormFieldSkin}
        theme={theme}
        render={() => {
          return (
            <div
              className={theme[themeId].autocompleteWrapper}
              onClick={props.handleAutocompleteClick}
            >
              <div
                className={classnames([
                  theme[themeId].autocompleteContent,
                  props.isOpen ? theme[themeId].opened : null,
                  props.selectedOptions.length
                    ? theme[themeId].hasSelectedWords
                    : null,
                  props.error ? theme[themeId].errored : null
                ])}
                ref={props.suggestionsRef}
              >
                {autocompleteContent}
              </div>

              <Options
                isOpen={props.isOpen}
                options={filteredAndLimitedOptions}
                isOpeningUpward={props.isOpeningUpward}
                onChange={props.handleChange}
                onClose={props.closeOptions}
                resetOnClose
                noResults={!props.filteredOptions.length}
                noResultsMessage={props.noResultsMessage}
                skin={OptionsSkin}
                theme={theme}
              />
            </div>
          );
        }}
        {...formfieldProps}
      />
    </div>
  );
};
