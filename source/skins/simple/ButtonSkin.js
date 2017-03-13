import React from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { BUTTON } from './identifiers';
// import FormFieldSkin from './FormFieldSkin';

const metaProps = [
  'label', 'skin', 'theme', 'registerSkinElement'
];

export default themr(BUTTON, null, { withRef: true })((props) => (
  <button
    {...omit(props, metaProps)}
    className={classnames([
      props.className,
      props.theme.button,
      props.disabled ? props.theme.disabled : null,
    ])}
    ref={button => props.registerSkinElement(button)}
  >
    {props.label}
  </button>
));
