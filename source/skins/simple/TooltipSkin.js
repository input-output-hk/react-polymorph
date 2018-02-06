import React from 'react';

// external libraries
import classnames from 'classnames';

// skins
import SimpleBubbleSkin from './BubbleSkin';

// themes
import { SimpleBubbleTheme } from '../../themes/simple';

// internal utility functions
import { pickDOMProps } from '../../utils';


// because the Tooltip skin is composed of the bubble skin,
// there is an issue with themeOverrides being overwritten
// by SimpleBubbleTheme
export default props => (
  <span
    {...pickDOMProps(props)}
    className={classnames([props.className, props.theme.root])}
  >
    <SimpleBubbleSkin
      className={classnames([
        props.theme.bubble,
        props.isAligningRight ? props.theme.alignRight : props.theme.alignLeft,
        props.isBounded ? null : props.theme.nowrap
      ])}
      theme={SimpleBubbleTheme}
      isOpeningUpward={props.isOpeningUpward}
    >
      {props.tip}
    </SimpleBubbleSkin>
    {props.children}
  </span>
);
