import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TEXT_AREA } from '../identifiers';
import { pickDOMProps } from '../../../utils/props';
import RawFormFieldSkin from './FormFieldSkin';
import TextArea from '../../../components/TextArea';

export const textAreaSkinFactory = (FormFieldSkin) => (
  (props) => (
    <FormFieldSkin input={
      <textarea
        {...pickDOMProps(props)}
        className={classnames([
          props.theme.textarea,
          props.disabled ? props.theme.disabled : null,
          props.error ? props.theme.errored : null,
        ])}
        ref={textarea => {
          props.component.registerSkinPart(TextArea.SKIN_PARTS.TEXT_AREA, textarea);
        }}
      />
    } {...props} />
  )
);

export default themr(TEXT_AREA)(textAreaSkinFactory(RawFormFieldSkin));
