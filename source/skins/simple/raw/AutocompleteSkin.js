import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from '../identifiers';
import RawFormFieldSkin from './FormFieldSkin';
import Autocomplete from '../../../components/Autocomplete';
import Options from '../../../components/Options';
import SimpleOptionsSkin from '../../../skins/simple/OptionsSkin';

/**
 * The raw skin for the Autocomplete component.
 *
 * Since the skin uses raw sub-components by default, it exports this
 * factory method to make this configurable from the outside. This
 * is needed to provide components with a default skin (see one level up).
 *
 * @param FormFieldSkin
 * @returns {Component}
 */

export const autocompleteSkinFactory = (FormFieldSkin) => (
  (props) => {
    const filteredAndLimitedOptions = _.slice(props.filteredOptions, 0, props.maxVisibleOptions);
    const isFirstOptionHighlighted = props.highlightedOptionIndex === 0;

    let selectedOptions = props.selectedOptions && props.selectedOptions.map((selectedOption, index) => {
      return (
        <span className={props.theme.selectedWordBox} key={index}>
        <span className={props.theme.selectedWordValue}>
          {selectedOption}
          <span
            className={props.theme.selectedWordRemoveButton}
            onClick={props.component.removeOption.bind(null, index)}
          >
            &times;
          </span>
        </span>
      </span>
      );
    });

    // show placeholder only if no maximum selections declared or maximum not reached
    const canMoreOptionsBeSelected = props.selectedOptions.length < props.maxSelections;
    let placeholder = (!props.maxSelections || canMoreOptionsBeSelected) ? props.placeholder : '';

    // selected words and input for enter new one
    const autocompleteContent = (
      <div className={props.theme.selectedWords}>
        {selectedOptions}
        <input
          className={props.theme.selectWords}
          onKeyDown={props.component.onKeyDown}
          placeholder={placeholder}
          onKeyUp={props.component.clearInvalidChars}
          ref={element => {
            props.component.registerSkinPart(Autocomplete.SKIN_PARTS.INPUT, element);
          }}
        />
      </div>
    );

    return (
      <div ref={(element) => props.component.registerSkinPart(Autocomplete.SKIN_PARTS.ROOT, element)}>
        <FormFieldSkin input={
          <div
            className={props.theme.autocompleteWrapper}
            onClick={props.component.handleAutocompleteClick}
          >
            <div
              className={classnames([
                props.theme.autocompleteContent,
                props.isOpen ? props.theme.opened : null,
                props.selectedOptions.length ? props.theme.hasSelectedWords : null,
                props.error ? props.theme.errored : null,
              ])}
              ref={element => {
                props.component.registerSkinPart(Autocomplete.SKIN_PARTS.SUGGESTIONS, element);
              }}
            >
              {autocompleteContent}
            </div>
          </div>
        } {...props} />
        <Options
          isOpen={props.isOpen}
          options={filteredAndLimitedOptions}
          skin={<SimpleOptionsSkin />}
          isOpeningUpward={props.isOpeningUpward}
          onChange={props.component.handleChange}
          onClose={props.component.closeOptions}
          resetOnClose
          noResults={!props.filteredOptions.length}
          noResultsMessage={props.noResultsMessage}
        />
      </div>
    );
  }
);

/**
 * Export the raw version of this component which does not include any styles.
 */
export default themr(AUTOCOMPLETE)(autocompleteSkinFactory(RawFormFieldSkin));
