import React from "react";

// external libraries
import classnames from "classnames";

// components
import { Bubble } from "../../components";

// skins
import { BubbleSkin } from "./";

export default props => {
  const {
    getOptionProps,
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
    isSelectedOption,
    handleClickOnOption,
    setHighlightedOptionIndex,
    optionsRef
  } = props;

  const highlightedOptionIndex = getHighlightedOptionIndex();
  const isFirstOptionHighlighted = highlightedOptionIndex === 0;
  const sortedOptions = isOpeningUpward ? options.slice().reverse() : options;

  const renderOptions = () => {
    // check for user's custom render function
    // if Options is being rendered via Autocomplete,
    // the value of props.render is renderOptions passed down from AutocompleteSkin
    if (!noResults && render) {
      // call user's custom render function
      return render(getOptionProps);
    } else if (!noResults && !render) {
      // render default simple skin
      return sortedOptions.map((option, index) => {
        // saves reference to func in memory, prevents unwanted rerenders
        // anonymous funcs in event handlers are reassigned in memory each render cycle
        const boundSetHighlightedOptionIndex = setHighlightedOptionIndex.bind(null, index);
        const boundHandleClickOnOption = handleClickOnOption.bind(null, option);

        return (
          <li
            key={index}
            className={classnames([
              theme[themeId].option,
              isHighlightedOption(index) ? theme[themeId].highlightedOption : null,
              isSelectedOption(index) ? theme[themeId].selectedOption : null,
              option.isDisabled ? theme[themeId].disabledOption : null
            ])}
            onClick={boundHandleClickOnOption}
            onMouseEnter={boundSetHighlightedOptionIndex}
          >
            {optionRenderer
              ? optionRenderer(option)
              : typeof option === 'object' ? option.label : option}
          </li>
        )
      });
    } else {
      // render no results message
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
