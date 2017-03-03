import React from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { INPUT } from './identifiers';
import FormFieldSkin from './FormFieldSkin';

export default themr(INPUT, null, { withRef: true })((props) => (
  <FormFieldSkin input={
    <input
      {...omit(props, ['skin', 'theme', 'registerSkinInputElement', 'error'])}
      className={classnames([
        props.className,
        props.theme.input,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={input => props.registerSkinInputElement(input)}
    />
  } {...props} />
));
