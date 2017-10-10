import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers';

export default themr(BUTTON)((props) => (
  <button
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
    ])}
  >
    {props.label}
  </button>
));
