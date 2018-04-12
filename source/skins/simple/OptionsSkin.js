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
      // call custom render function
      return render(getOptionProps);
    } else if (!noResults && !render) {
      // render default skin
      return sortedOptions.map((option, index) => (
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
            : typeof option === "object" ? option.label : option}
        </li>
      ));
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
