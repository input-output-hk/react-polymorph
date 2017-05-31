import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';
import { themr } from 'react-css-themr';
import { BUTTON } from './identifiers';
import DefaultButtonTheme from '../../themes/simple/SimpleButton.scss';

export default themr(BUTTON, DefaultButtonTheme, { withRef: true })((props) => (
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
