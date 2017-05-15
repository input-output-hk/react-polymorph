import React from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { BUTTON } from './identifiers';
import Button from '../../components/Button';

export default themr(BUTTON, null, { withRef: true })((props) => (
  <button
    {...omit(props, Button.metaProps)}
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
    ])}
    ref={button => props.component.registerSkinPart(button)}
  >
    {props.label}
  </button>
));
