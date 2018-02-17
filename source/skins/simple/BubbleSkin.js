import React from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => (
  <div
    ref={props.rootRef}
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
      props.isOpeningUpward ? props.theme.openUpward : null,
      props.isTransparent ? props.theme.transparent : null,
      props.isFloating ? props.theme.isFloating : null,
      props.isHidden ? props.theme.isHidden : null
    ])}
    style={
      props.position && {
        [props.isOpeningUpward ? 'bottom' : 'top']: props.position.positionY,
        left: props.position.positionX,
        width: props.position.width
      }
    }
  >
    <div className={props.theme.bubble} data-bubble-container>
      {props.children}
    </div>
    <span className={props.theme.arrow} data-bubble-arrow />
  </div>
);
