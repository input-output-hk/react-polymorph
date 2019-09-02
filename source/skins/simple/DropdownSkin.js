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
  rootRef: ElementRef<*>,
  theme: Object,
  themeId: string,
  toggleMouseOverRoot: Function,
  toggleMouseOverItems: Function,
};

export const DropdownSkin = (props: Props) => {
  const { theme, themeId, toggleMouseOverItems, toggleMouseOverRoot } = props;
  const themeApi = theme[themeId];
  return (
    <div
      ref={props.rootRef}
      className={classnames([
        props.className,
        themeApi.dropdown,
      ])}
      onMouseEnter={toggleMouseOverRoot}
      onMouseLeave={toggleMouseOverRoot}
    >
      <div className={themeApi.label}>
        {props.label}
      </div>
      <Options
        skin={OptionsSkin}
        theme={props.theme}
        isOpen={true /*props.isOpen*/}
        options={props.items}
        selectedOption={props.activeItem}
        toggleMouseLocation={toggleMouseOverItems}
        noOptionsArrow
      />
    </div>
  );
};
