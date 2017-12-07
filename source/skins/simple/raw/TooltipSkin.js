import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers';
import Bubble from '../../../components/Bubble';
import SimpleBubbleSkin from '../BubbleSkin';

export default themr(TOOLTIP)((props) => (
  <span
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
    ])}
  >
    <Bubble
      skin={<SimpleBubbleSkin />}
      isOpeningUpward={props.isOpeningUpward}
      className={classnames([
        props.theme.bubble,
        props.isAligningRight ? props.theme.alignRight : props.theme.alignLeft,
        props.isBounded ? null : props.theme.nowrap,
      ])}
    >
      {props.tip}
    </Bubble>
    {props.children}
  </span>
));
