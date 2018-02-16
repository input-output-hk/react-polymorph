import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers';
import Bubble from '../../../components/Bubble';
import RawBubbleSkin from './BubbleSkin';

/**
 * The raw skin for the Tooltip component.
 *
 * Since the skin uses raw sub-components by default, it exports this
 * factory method to make this configurable from the outside. This
 * is needed to provide components with a default skin (see one level up).
 *
 * @param BubbleSkin
 * @returns {Component}
 */

export const tooltipSkinFactory = (BubbleSkin) => (
  (props) => (
    <span
      {...pickDOMProps(props)}
      className={classnames([
        props.className,
        props.theme.root,
      ])}
    >
      <Bubble
        skin={<BubbleSkin />}
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
  )
);

/**
 * Export the raw version of this component which does not include any styles.
 */
export default themr(TOOLTIP)(
  tooltipSkinFactory(RawBubbleSkin),
);
