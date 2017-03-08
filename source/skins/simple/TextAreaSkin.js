import React, { Component } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { TEXT_AREA } from './identifiers';
import FormFieldSkin from './FormFieldSkin';

const metaProps = [
  'skin', 'theme', 'registerSkinFormElement', 'error', 'autoResize'
];

export default themr(TEXT_AREA, null, { withRef: true })((props) => (
  <FormFieldSkin input={
    <textarea
      {...omit(props, metaProps)}
      className={classnames([
        props.className,
        props.theme.textarea,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={textarea => props.registerSkinFormElement(textarea)}
    >
    </textarea>
  } {...props} />
));
