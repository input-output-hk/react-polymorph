import React from 'react';

// external libraries
import classnames from 'classnames';

// skins
import SimpleBubbleSkin from './BubbleSkin';

// themes
import { SimpleBubbleTheme } from '../../themes/simple';

// internal utility functions
import { pickDOMProps } from '../../utils';



// because Tooltip's skin is composed of the BubbleSkin,
// when the user provides themeOverrides for Tooltip's theme.bubble
// there is an issue of SimpleBubbleTheme's bubble property
// overwriting the user's custom styles for Tooltip's theme.bubble
// this function will combine the custom styles with SimpleBubbleTheme's bubble property
const getBubbleOverrides = (theme, SimpleBubbleTheme) => {
  if (theme.bubble) {
    return { ...SimpleBubbleTheme, bubble: `${SimpleBubbleTheme.bubble} ${theme.bubble}` };
  } else {
    return SimpleBubbleTheme;
  }
}

export default props => {
  const themeWithBubbleOverrides = getBubbleOverrides(props.theme, SimpleBubbleTheme);

  return (
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
        theme={themeWithBubbleOverrides}
        isOpeningUpward={props.isOpeningUpward}
      >
        {props.tip}
      </SimpleBubbleSkin>
      {props.children}
    </span>
  );
};
