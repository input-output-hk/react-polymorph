import React from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Bubble } from '../../components';

// skins
import { BubbleSkin } from './';

// themes
import { BubbleTheme } from '../../themes/simple';

// internal utility functions
import { pickDOMProps } from '../../utils';

// because Tooltip's skin is composed of the Bubble,
// when the user provides themeOverrides for Tooltip's theme.bubble
// there is an issue of BubbleTheme's bubble property
// overwriting the user's custom styles for Tooltip's theme.bubble
// this function will combine the custom styles with BubbleTheme's bubble property
const getBubbleOverrides = (theme, BubbleTheme) => {
  if (theme.bubble) {
    return { ...BubbleTheme, bubble: `${BubbleTheme.bubble} ${theme.bubble}` };
  } else {
    return BubbleTheme;
  }
};

export default props => {
  const themeWithBubbleOverrides = getBubbleOverrides(props.theme, BubbleTheme);

  return (
    <span
      {...pickDOMProps(props)}
      className={classnames([props.className, props.theme.root])}
    >
      <Bubble
        className={classnames([
          props.theme.bubble,
          props.isAligningRight
            ? props.theme.alignRight
            : props.theme.alignLeft,
          props.isBounded ? null : props.theme.nowrap
        ])}
        isOpeningUpward={props.isOpeningUpward}
        skin={BubbleSkin}
        theme={themeWithBubbleOverrides}
        isTransparent={props.isTransparent}
      >
        {props.tip}
      </Bubble>
      {props.children}
    </span>
  );
};
