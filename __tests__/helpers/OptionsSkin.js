// @flow
import React from 'react';
import type { Element, Ref } from 'react';

// external libraries
import classnames from 'classnames';

// components & skins
import { Bubble } from '../../source/components/Bubble';
import { BubbleSkin } from '../../source/skins/simple';

// context helper for enzyme
import { CONTEXT } from './context';

type Props = {
  render: Function,
  options: Array<any>,
  optionRenderer: Function,
  isOpeningUpward: boolean,
  isOpen: boolean,
  noResults: boolean,
  noResultsMessage: string | Element<any>,
  selectedOption: any,
  getOptionProps: Function,
  getHighlightedOptionIndex: Function,
  isHighlightedOption: Function,
  isSelectedOption: Function,
  handleClickOnOption: Function,
  setHighlightedOptionIndex: Function,
  optionsRef: Ref<*>,
  theme: Object,
  themeId: string,
};

export default (props: Props) => {
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

  const checkOptionRenderer = option => {
    if (optionRenderer) {
      return optionRenderer(option);
    } else if (typeof option === 'object') {
      return option.label;
    }
    return option;
  };

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
            {checkOptionRenderer(option)}
          </li>
        );
      });
    }
    // render no results message
    return <li className={theme[themeId].option}>{noResultsMessage}</li>;
  };

  return (
    <div ref={optionsRef}>
      <Bubble
        className={classnames([
          theme[themeId].options,
          isOpen ? theme[themeId].isOpen : null,
          isOpeningUpward ? theme[themeId].openUpward : null,
          isFirstOptionHighlighted && !noResults
            ? theme[themeId].firstOptionHighlighted
            : null
        ])}
        context={CONTEXT}
        isTransparent={false}
        skin={BubbleSkin}
        isOpeningUpward={isOpeningUpward}
        isHidden={!isOpen}
        isFloating
      >
        <ul className={theme[themeId].ul}>{renderOptions()}</ul>
      </Bubble>
    </div>
  );
};
