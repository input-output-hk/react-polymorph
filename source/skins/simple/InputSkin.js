import React from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { INPUT } from './identifiers';
import FormFieldSkin from './FormFieldSkin';
import Input from '../../components/Input';
import DefaultInputTheme from '../../themes/simple/SimpleInput.scss';

export default themr(INPUT, DefaultInputTheme, { withRef: true })((props) => (
  <FormFieldSkin input={
    <input
      {...omit(props, Input.metaProps)}
      className={classnames([
        props.theme.input,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={input => props.component.registerSkinPart(Input.SKIN_PARTS.INPUT, input)}
    />
  } {...props} />
));
