import React from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Bubble } from '../../components';

// skins
import { BubbleSkin } from './';

export default props => {
  const {
    getOptionProps,
    children,
    render,
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

  const renderOptions = () => {
    // if there are results + the user wants to control rendering
    // via the render or children function
    if ((!noResults && children) || (!noResults && render)) {
      // delegate the use of sortedOptions and getOptionProps to the user
      // by calling children/render func with those two params
      // TODO: check to call either children OR render
      return children({ sortedOptions, getOptionProps });
      // children
      //   ? children({ sortedOptions, getOptionProps })
      //   : render({ sortedOptions, getOptionProps });
    }

    // there are results and user did not pass render or children func
    if (!noResults) {
      return sortedOptions.map((option, index) => (
        <li
          key={index}
          className={classnames([
            theme[themeId].option,
            isHighlightedOption(index)
              ? theme[themeId].highlightedOption
              : null,
            option.isDisabled ? theme[themeId].disabledOption : null
          ])}
          onClick={event => handleClickOnOption(option, event)}
          onMouseEnter={() => setHighlightedOptionIndex(index)}
        >
          {optionRenderer
            ? optionRenderer(option)
            : typeof option === 'object' ? option.label : option}
        </li>
      ));
    } else {
      // there are no results
      return <li className={theme[themeId].option}>{noResultsMessage}</li>;
    }
  };

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
      <ul className={theme[themeId].ul}>{renderOptions()}</ul>
    </Bubble>
  );
};
