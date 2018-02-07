import React from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => (
  <div
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
      props.isOpeningUpward ? props.theme.openUpward : null,
      props.isTransparent ? props.theme.transparent : null
    ])}
  >
    <div className={props.theme.bubble} data-bubble-container>
      {props.children}
    </div>
    <span className={props.theme.arrow} data-bubble-arrow />
  </div>
);
