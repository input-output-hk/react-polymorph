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
    themeId,
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
        theme[themeId].options,
        isOpen ? theme[themeId].isOpen : null,
        isOpeningUpward ? theme[themeId].openUpward : null,
        isFirstOptionHighlighted && !noResults
          ? theme[themeId].firstOptionHighlighted
          : null
      ])}
      ref={optionsRef}
      isTransparent={false}
      skin={BubbleSkin}
      isOpeningUpward={isOpeningUpward}
      isHidden={!isOpen}
      isFloating
    >
      <ul className={theme[themeId].ul}>
        {!noResults ? (
          sortedOptions.map((option, index) => (
            <li
              key={index}
              className={classnames([
                theme[themeId].option,
                isHighlightedOption(index) ? theme[themeId].highlightedOption : null,
                option.isDisabled ? theme[themeId].disabledOption : null
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
          <li className={theme[themeId].option}>{noResultsMessage}</li>
        )}
      </ul>
    </Bubble>
  );
};
