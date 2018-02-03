import React from 'react';

// external libraries
import classnames from 'classnames';

// skins
import SimpleBubbleSkin from './BubbleSkin';

// themes
import { SimpleBubbleTheme } from '../../themes/simple';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => (
  <span
    {...pickDOMProps(props)}
    className={classnames([props.className, props.theme.root])}
  >
    <SimpleBubbleSkin
      theme={SimpleBubbleTheme}
      isOpeningUpward={props.isOpeningUpward}
      className={classnames([
        props.theme.bubble,
        props.isAligningRight ? props.theme.alignRight : props.theme.alignLeft,
        props.isBounded ? null : props.theme.nowrap
      ])}
    >
      {props.tip}
    </SimpleBubbleSkin>
    {props.children}
  </span>
);
