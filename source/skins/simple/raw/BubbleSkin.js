import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { BUBBLE } from '../identifiers';

export default themr(BUBBLE)((props) => (
  <div
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
      props.isOpeningUpward ? props.theme.openUpward : null,
      props.isTransparent ? props.theme.transparent : null,
    ])}
  >
    <div className={props.theme.bubble} data-bubble-container >
      {props.children}
    </div>
    <span className={props.theme.arrow} data-bubble-arrow />
  </div>
));
