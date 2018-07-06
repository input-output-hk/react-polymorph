// @flow
import React from 'react';
import type { Ref, Element } from 'react';

// external libraries
import _ from 'lodash';
import classnames from 'classnames';

// components
import { FormField } from '../../components/FormField';
import { Options } from '../../components/Options';

// skins
import { FormFieldSkin } from './FormFieldSkin';
import { OptionsSkin } from './OptionsSkin';

type Props = {
  className: string,
  error: string,
  filteredOptions: Array<any>,
  getSelectionProps: Function,
  handleAutocompleteClick: Function,
  handleChange: Function,
  handleInputChange: Function,
  inputRef: Ref<'input'>,
  inputValue: string,
  isOpeningUpward: boolean,
  isOpen: boolean,
  label: string | Element<any>,
  maxSelections: number,
  maxVisibleOptions: number,
  onKeyDown: Function,
  options: Array<any>,
  optionsRef: Ref<any>,
  placeholder: string,
  removeOption: Function,
  renderSelections: Function,
  renderOptions: Function,
  rootRef: Ref<any>,
  selectedOptions: Array<any>,
  suggestionsRef: Ref<*>,
  theme: Object,
  themeId: string
};

export const AutocompleteSkin = (props: Props) => {
  const theme = props.theme[props.themeId];

  const filteredAndLimitedOptions = _.slice(
    props.filteredOptions,
    0,
    props.maxVisibleOptions
  );

  // show placeholder only if no maximum selections declared or maximum not reached
  const canMoreOptionsBeSelected =
    props.selectedOptions.length < props.maxSelections;

  const placeholder =
    !props.maxSelections || canMoreOptionsBeSelected ? props.placeholder : '';

  const renderSelectedOptions = () => {
    // check if the user passed a renderSelections function
    if (props.selectedOptions && props.renderSelections) {
      // call custom renderSelections function
      return props.renderSelections(props.getSelectionProps);
    } else if (props.selectedOptions && !props.renderSelections) {
      // render default skin
      return props.selectedOptions.map((selectedOption, index) => (
        <span className={theme.selectedWordBox} key={index}>
          <span className={theme.selectedWordValue}>
            {selectedOption}
            <span
              role="presentation"
              aria-hidden
              className={theme.selectedWordRemoveButton}
              onClick={props.removeOption.bind(null, index)}
            >
              &times;
            </span>
          </span>
        </span>
      ));
    }
    return null;
  };

  // A label, input, and selected words are the content
  const renderContent = () => (
    <FormField
      error={props.error}
      inputRef={props.inputRef}
      label={props.label}
      skin={FormFieldSkin}
      render={() => (
        <div
          className={classnames([
            theme.autocompleteContent,
            props.isOpen ? theme.opened : null,
            props.selectedOptions.length
              ? theme.hasSelectedWords
              : null,
            props.error ? theme.errored : null
          ])}
          ref={props.suggestionsRef}
        >
          <div className={theme.selectedWords}>
            {renderSelectedOptions()}
            <input
              ref={props.inputRef}
              placeholder={placeholder}
              value={props.inputValue}
              onChange={props.handleInputChange}
              onKeyDown={props.onKeyDown}
            />
          </div>
        </div>
      )}
    />
  );

  return (
    <div
      aria-hidden
      className={classnames([props.className, theme.autocompleteWrapper])}
      onClick={props.handleAutocompleteClick}
      ref={props.rootRef}
      role="presentation"
    >

      {renderContent()}

      <Options
        optionsRef={props.optionsRef}
        isOpen={props.isOpen}
        isOpeningUpward={props.isOpeningUpward}
        noResults={!props.filteredOptions.length}
        onChange={props.handleChange}
        options={filteredAndLimitedOptions}
        resetOnClose
        selectedOptions={props.selectedOptions}
        skin={OptionsSkin}
        render={props.renderOptions}
      />
    </div>
  );
};
