import React from 'react';

// external libraries
import classnames from 'classnames';

// components
import { Bubble } from '../../components';

// skins
import { BubbleSkin } from './';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => {
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
        isTransparent={props.isTransparent}
      >
        {props.tip}
      </Bubble>
      {props.children}
    </span>
  );
};
