import React from 'react';

// external libraries
import _ from 'lodash';
import classnames from 'classnames';

// components
import FormField from '../../components/FormField';
import Options from '../../components/Options';

// skins
import SimpleFormFieldSkin from '../../skins/simple/FormFieldSkin';
import SimpleOptionsSkin from '../../skins/simple/OptionsSkin';

// themes
import { SimpleFormFieldTheme, SimpleOptionsTheme } from '../../themes/simple';

export default props => {
  const { label, error } = props;
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
    !props.maxSelections || canMoreOptionsBeSelected ? props.placeholder : '';

  let selectedOptions =
    props.selectedOptions &&
    props.selectedOptions.map((selectedOption, index) => {
      return (
        <span className={props.theme.selectedWordBox} key={index}>
          <span className={props.theme.selectedWordValue}>
            {selectedOption}
            <span
              className={props.theme.selectedWordRemoveButton}
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
    <div className={props.theme.selectedWords}>
      {selectedOptions}
      <input
        ref={props.inputRef}
        className={props.theme.selectWords}
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
        skin={SimpleFormFieldSkin}
        theme={SimpleFormFieldTheme}
        render={() => {
          return (
            <div
              className={props.theme.autocompleteWrapper}
              onClick={props.handleAutocompleteClick}
            >
              <div
                className={classnames([
                  props.theme.autocompleteContent,
                  props.isOpen ? props.theme.opened : null,
                  props.selectedOptions.length
                    ? props.theme.hasSelectedWords
                    : null,
                  props.error ? props.theme.errored : null
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
                theme={SimpleOptionsTheme}
                skin={SimpleOptionsSkin}
              />
            </div>
          );
        }}
        {...formfieldProps}
      />
    </div>
  );
};
