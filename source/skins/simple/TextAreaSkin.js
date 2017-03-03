import React, { Component } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { TEXT_AREA } from './identifiers';
import FormFieldSkin from './FormFieldSkin';

export default themr(TEXT_AREA, null, { withRef: true })((props) => (
  <FormFieldSkin input={
    <textarea
      {...omit(props, ['skin', 'theme', 'registerSkinInputElement', 'error', 'autoResize'])}
      className={classnames([
        props.className,
        props.theme.textarea,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={textarea => props.registerSkinInputElement(textarea)}
    >
    </textarea>
  } {...props} />
));
