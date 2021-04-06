// @flow
import React from 'react';
import type { Element, ElementRef, RefObject } from 'react';

// external libraries
import classnames from 'classnames';
import { isFunction, isObject } from 'lodash';

// components
import { Bubble } from '../../components/Bubble';
import { Input } from '../../components/Input';
import { ScrollBar } from '../../components/ScrollBar';

// skins
import { BubbleSkin } from './BubbleSkin';
import { InputSkin } from './InputSkin';

type Props = {
  getOptionProps: Function,
  getHighlightedOptionIndex: Function,
  handleClickOnOption: Function,
  hasSearch?: boolean,
  hideSearchClearButton?: boolean,
  highlightSearch?: boolean,
  isHighlightedOption: Function,
  isOpen: boolean,
  isOpeningUpward: boolean,
  isSelectedOption: Function,
  noOptionsArrow?: boolean,
  noResults: boolean,
  noResultsMessage: string | Element<any>,
  noSelectedOptionCheckmark?: boolean,
  onClearSearchValue: Function,
  onSearch: Function,
  optionHeight: number,
  optionRenderer: Function,
  options: Array<any>,
  optionsRef: ElementRef<*>,
  optionsMaxHeight: number,
  render: Function,
  searchHeight: number,
  searchInputRef?: RefObject,
  searchValue: string,
  selectedOption: any,
  setHighlightedOptionIndex: Function,
  setMouseIsOverOptions?: (boolean) => void,
  targetRef: ElementRef<*>,
  theme: Object,
  themeId: string,
};

export const OptionsSkin = (props: Props) => {
  const {
    getOptionProps,
    getHighlightedOptionIndex,
    handleClickOnOption,
    hasSearch,
    highlightSearch,
    isHighlightedOption,
    isOpen,
    isOpeningUpward,
    isSelectedOption,
    noOptionsArrow,
    noResults,
    noResultsMessage,
    noSelectedOptionCheckmark,
    optionHeight,
    optionsMaxHeight,
    optionRenderer,
    options,
    optionsRef,
    render,
    searchHeight,
    searchValue,
    setHighlightedOptionIndex,
    setMouseIsOverOptions,
    targetRef,
    theme,
    themeId,
  } = props;

  const highlightedOptionIndex = getHighlightedOptionIndex();
  const isFirstOptionHighlighted = !hasSearch && highlightedOptionIndex === 0;
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
              option.className ? option.className : null,
              theme[themeId].option,
              isHighlightedOption(index) ? theme[themeId].highlightedOption : null,
              isSelectedOption(index) ? theme[themeId].selectedOption : null,
              option.isDisabled ? theme[themeId].disabledOption : null,
              noSelectedOptionCheckmark ? theme[themeId].hasNoSelectedOptionCheckmark : null,
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
      let { label } = option;
      // in case `highlightSearch` then `searchValue` is wrapped in an `em` tag
      if (highlightSearch !== false) {
        const splitter = new RegExp(`(${searchValue})`,'i');
        const parts = label.split(splitter);
        for (let i = 1; i < parts.length; i += 2) {
          if (parts[i].toLowerCase() === searchValue.toLowerCase())
            parts[i] = <em>{parts[i]}</em>;
          label = parts;
        }
      }
      return <span className={theme[themeId].label}>{label}</span>;
    }
    return option;
  };

  const renderSearch = () => {
    return (
      <div className={theme[themeId].search}>
        <Input
          skin={InputSkin}
          theme={theme}
          value={searchValue}
          onChange={props.onSearch}
          autoFocus={true}
          inputRef={props.searchInputRef || null}
        />
        {!props.hideSearchClearButton && (
          <button
            className={searchValue ? theme[themeId].active : null}
            onClick={props.onClearSearchValue}
          />
        )}
      </div>
    )
  }

  const getScrollBarHeight = (): number => {
    let height = options.length
      ? options.length * optionHeight
      : optionHeight;
    if (height > optionsMaxHeight) {
      height = optionsMaxHeight;
    }
    if (hasSearch) {
      if (options.length) {
        height += searchHeight;
      } else {
        height = searchHeight;
      }
    }
    return height;
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
      noArrow={noOptionsArrow}
      targetRef={targetRef}
    >
      <ul
        style={optionsStyle}
        ref={optionsRef}
        className={theme[themeId].ul}
        onMouseEnter={() => setMouseIsOverOptions && setMouseIsOverOptions(true)}
        onMouseLeave={() => setMouseIsOverOptions && setMouseIsOverOptions(false)}
      >
        <ScrollBar style={{ height: `${getScrollBarHeight()}px` }}>
          {hasSearch && renderSearch()}
          {renderOptions()}
        </ScrollBar>
      </ul>
    </Bubble>
  );
};
