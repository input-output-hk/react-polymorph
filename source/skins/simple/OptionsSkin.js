import React from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Bubble } from '../../components';

// skins
import { BubbleSkin } from './';

export default props => {
  const {
    theme,
    options,
    optionRenderer,
    isOpeningUpward,
    isOpen,
    noResults,
    noResultsMessage,
    getHighlightedOptionIndex,
    isHighlightedOption,
    handleClickOnOption,
    setHighlightedOptionIndex,
    optionsRef
  } = props;

  const highlightedOptionIndex = getHighlightedOptionIndex();
  const isFirstOptionHighlighted = highlightedOptionIndex === 0;
  const sortedOptions = isOpeningUpward ? options.slice().reverse() : options;

  return (
    <Bubble
      className={classnames([
        theme.options,
        isOpen ? theme.isOpen : null,
        isOpeningUpward ? theme.openUpward : null,
        isFirstOptionHighlighted && !noResults
          ? theme.firstOptionHighlighted
          : null
      ])}
      ref={optionsRef}
      isTransparent={false}
      skin={BubbleSkin}
      isOpeningUpward={isOpeningUpward}
      isHidden={!isOpen}
      isFloating
    >
      <ul className={theme.ul}>
        {!noResults ? (
          sortedOptions.map((option, index) => (
            <li
              key={index}
              className={classnames([
                theme.option,
                isHighlightedOption(index) ? theme.highlightedOption : null,
                option.isDisabled ? theme.disabledOption : null
              ])}
              onClick={event => handleClickOnOption(option, event)}
              onMouseEnter={() => setHighlightedOptionIndex(index)}
            >
              {optionRenderer
                ? optionRenderer(option)
                : typeof option === 'object' ? option.label : option}
            </li>
          ))
        ) : (
          <li className={theme.option}>{noResultsMessage}</li>
        )}
      </ul>
    </Bubble>
  );
};
