// @flow
import React from 'react';
import type { Element, ElementRef } from 'react';

// external libraries
import classnames from 'classnames';
import { isFunction, isObject } from 'lodash';

// components
import { Bubble } from '../../components/Bubble';

// skins
import { BubbleSkin } from './BubbleSkin';

type Props = {
  getOptionProps: Function,
  getHighlightedOptionIndex: Function,
  handleClickOnOption: Function,
  isHighlightedOption: Function,
  isOpen: boolean,
  isOpeningUpward: boolean,
  isSelectedOption: Function,
  noResults: boolean,
  noResultsMessage: string | Element<any>,
  optionRenderer: Function,
  options: Array<any>,
  optionsRef: ElementRef<*>,
  optionsMaxHeight: number,
  render: Function,
  selectedOption: any,
  setHighlightedOptionIndex: Function,
  targetRef: ElementRef<*>,
  theme: Object,
  themeId: string,
  toggleMouseLocation: Function,
};

export const OptionsSkin = (props: Props) => {
  const {
    getOptionProps,
    getHighlightedOptionIndex,
    handleClickOnOption,
    isHighlightedOption,
    isOpen,
    isOpeningUpward,
    isSelectedOption,
    noResults,
    noResultsMessage,
    optionsMaxHeight,
    optionRenderer,
    options,
    optionsRef,
    render,
    setHighlightedOptionIndex,
    targetRef,
    theme,
    themeId,
    toggleMouseLocation,
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
        // set reference of event handlers in memory to prevent excess re-renders
        const boundSetHighlightedOptionIndex = setHighlightedOptionIndex.bind(null, index);
        const boundHandleClickOnOption = handleClickOnOption.bind(null, option);

        return (
          <li
            role="presentation"
            aria-hidden
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
            {renderOption(option)}
          </li>
        );
      });
    }
    // render no results message
    return <li className={theme[themeId].option}>{noResultsMessage}</li>;
  };

  const renderOption = option => {
    // check if user has passed render prop "optionRenderer"
    if (optionRenderer && isFunction(optionRenderer)) {
      // call user's custom rendering logic
      return optionRenderer(option);
    } else if (isObject(option)) {
      return <span className={theme[themeId].label}>{option.label}</span>;
    }
    return option;
  };

  // Enforce max height of options dropdown if necessary
  const optionsStyle = optionsMaxHeight == null ? null : {
    maxHeight: `${optionsMaxHeight}px`
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
      isTransparent={false}
      skin={BubbleSkin}
      isOpeningUpward={isOpeningUpward}
      isHidden={!isOpen}
      isFloating
      targetRef={targetRef}
    >
      <ul
        style={optionsStyle}
        ref={optionsRef}
        className={theme[themeId].ul}
        onMouseEnter={toggleMouseLocation}
        onMouseLeave={toggleMouseLocation}
      >
        {renderOptions()}
      </ul>
    </Bubble>
  );
};
