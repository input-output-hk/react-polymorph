import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { INPUT } from './identifiers';
import { pickDOMProps } from '../../utils/props';
import FormFieldSkin from './FormFieldSkin';
import Input from '../../components/Input';
import DefaultInputTheme from '../../themes/simple/SimpleInput.scss';

export default themr(INPUT, DefaultInputTheme, { withRef: true })((props) => (
  <FormFieldSkin input={
    <input
      {...pickDOMProps(props)}
      className={classnames([
        props.theme.input,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={input => props.component.registerSkinPart(Input.SKIN_PARTS.INPUT, input)}
    />
  } {...props} />
));
