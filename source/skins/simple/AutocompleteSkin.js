import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from './identifiers';
import FormFieldSkin from './FormFieldSkin';
import Autocomplete from '../../components/Autocomplete';
import DefaultAutocompleteTheme from '../../themes/simple/SimpleAutocomplete.scss';

export default themr(AUTOCOMPLETE, DefaultAutocompleteTheme, { withRef: true })((props) => {
  let selectedWords = props.selectedWords && props.selectedWords.map((selectedWord, index) => {
    return (
      <span className={props.theme.selectedWordBox} key={index}>
        <span className={props.theme.selectedWordValue}>
          {selectedWord}
          <span
            className={props.theme.selectedWordRemoveButton}
            onClick={props.component.removeWord.bind(null, selectedWord)}
          >
            &times;
          </span>
        </span>
      </span>
    );
  });

  // show placeholder only if no maximum selections declared or maximum not reached
  let placeholder = (!props.maxSelections || (props.selectedWords.length < props.maxSelections)) ? props.placeholder : '';

  // selected words and input for enter new one
  const autocompleteContent = (
    <div className={props.theme.selectedWords}>
      {selectedWords}
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
    <FormFieldSkin input={
      <div className={props.theme.autocompleteWrapper} onClick={props.component.handleAutocompleteClick}>
        <div
          className={classnames([
            props.theme.autocompleteContent,
            props.isSuggestionsOpened ? props.theme.opened : null,
            props.selectedWords.length ? props.theme.hasSelectedWords : null,
            props.error ? props.theme.errored : null,
          ])}
          ref={element => {
            props.component.registerSkinPart(Autocomplete.SKIN_PARTS.AUTOCOMPLETE, element);
          }}
        >
          {autocompleteContent}
        </div>
        {props.suggestedWords &&
          <ul
            className={classnames([
              props.theme.suggestionsList,
              props.isSuggestionsOpened ? props.theme.opened : null,
            ])}
          >
            {props.filteredWords.length ? props.filteredWords.map((option, index) => {
              return (
                <li
                  key={index}
                  className={classnames([
                    props.theme.suggestionsListItem,
                    index === props.highlightedOptionIndex ? props.theme.highlighted : null,
                  ])}
                  onMouseEnter={() => props.component.setHighlightedOptionIndex(index)}
                  onClick={(event) => props.component.updateSelectedWords(event)}
                >
                  {option}
                </li>
              );
            }) :
            <li className={props.theme.suggestionsListItem}>No matching results</li>
          }
          </ul>
        }
      </div>

    } {...props} />
  );
});
