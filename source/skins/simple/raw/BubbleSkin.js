import React, { Component } from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { BUBBLE } from '../identifiers';
import Bubble from '../../../components/Bubble';

class BubbleSkin extends Component {
  render() {
    const { props } = this;
    return (
      <div
        {...pickDOMProps(props)}
        className={classnames([
          props.className,
          props.theme.root,
          props.isOpeningUpward ? props.theme.openUpward : null,
          props.isTransparent ? props.theme.transparent : null,
          props.isFloating ? props.theme.isFloating : null,
          props.isHidden ? props.theme.isHidden : null,
        ])}
        style={props.position && {
          [props.isOpeningUpward ? 'bottom' : 'top']: props.position.positionY,
          left: props.position.positionX,
          width: props.position.width,
        }}
        ref={(element) => props.component.registerSkinPart(Bubble.SKIN_PARTS.ROOT, element)}
      >
        <div className={props.theme.bubble} data-bubble-container >
          {props.children}
        </div>
        <span className={props.theme.arrow} data-bubble-arrow />
      </div>
    );
  }
}

export default themr(BUBBLE)(BubbleSkin);
