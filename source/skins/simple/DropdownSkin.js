// @flow
import React from 'react';
import type { Element, ElementRef } from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Options } from '../../components/Options';

// skins
import { OptionsSkin } from './OptionsSkin';

type Props = {
  activeItem: any,
  className: string,
  label: string | Element<any>,
  isOpen: boolean,
  items: Array<any>,
  noArrow?: boolean,
  onItemSelected?: Function,
  onRootClick: () => void;
  rootRef: ElementRef<*>,
  theme: Object,
  themeId: string,
  setMouseOverRoot: Function,
  setMouseOverItems: Function,
};

export const DropdownSkin = (props: Props) => {
  const { theme, themeId, setMouseOverItems, setMouseOverRoot } = props;
  const themeApi = theme[themeId];
  return (
    <div
      ref={props.rootRef}
      className={classnames([
        props.className,
        themeApi.dropdown,
      ])}
      onClick={props.onRootClick}
      onMouseEnter={() => setMouseOverRoot(true)}
      onMouseLeave={() => setMouseOverRoot(false)}
    >
      <div className={themeApi.label}>
        {props.label}
      </div>
      <Options
        skin={OptionsSkin}
        theme={props.theme}
        isOpen={props.isOpen}
        options={props.items}
        onChange={props.onItemSelected}
        selectedOption={props.activeItem}
        setMouseIsOverOptions={setMouseOverItems}
        noOptionsArrow={props.noArrow}
        isFloating
      />
    </div>
  );
};
