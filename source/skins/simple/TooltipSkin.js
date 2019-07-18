// @flow
import React from 'react';
import type { Node, Element } from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Bubble } from '../../components/Bubble';

// skins
import { BubbleSkin } from './BubbleSkin';

// internal utility functions
import { pickDOMProps } from '../../utils/props';

type Props = {
  children?: ?Node,
  className?: string,
  isAligningRight?: boolean,
  isBounded?: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  arrowRelativeToTip: boolean,
  theme: Object,
  themeId: string,
  tip: string | Element<any>
};

export const TooltipSkin = (props: Props) => {
  const { theme, themeId } = props;
  return (
    <span
      {...pickDOMProps(props)}
      className={classnames([props.className, theme[themeId].root])}
    >
      <Bubble
        className={classnames([
          theme[themeId].bubble,
          props.isAligningRight
            ? theme[themeId].alignRight
            : theme[themeId].alignLeft,
          props.isBounded ? null : theme[themeId].nowrap
        ])}
        theme={theme}
        isOpeningUpward={props.isOpeningUpward}
        skin={BubbleSkin}
        isTransparent={props.isTransparent}
        arrowRelativeToTip={props.arrowRelativeToTip}
      >
        {props.tip}
      </Bubble>
      {props.children}
    </span>
  );
};
