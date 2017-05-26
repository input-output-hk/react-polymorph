import React from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import { themr } from 'react-css-themr';
import { INPUT } from './identifiers';
import FormFieldSkin from './FormFieldSkin';
import NumericInput from '../../components/NumericInput';
import DefaultInputTheme from '../../themes/simple/SimpleNumericInput.scss';

export default themr(INPUT, DefaultInputTheme, { withRef: true })((props) => (
  <FormFieldSkin input={
    <div className={props.theme.numericInputWrapper}>
      <input
        {...omit(props, NumericInput.metaProps)}
        className={classnames([
          props.theme.input,
          props.disabled ? props.theme.disabled : null,
          props.error ? props.theme.errored : null,
        ])}
        ref={input => props.component.registerSkinPart(NumericInput.SKIN_PARTS.INPUT, input)}
      />
      {props.rightLabel && (
        <span className={props.theme.rightLabel}>
          {props.rightLabel}
        </span>
      )}
    </div>
  } {...props} />
));
