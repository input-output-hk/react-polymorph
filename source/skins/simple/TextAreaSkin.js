import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';
import { themr } from 'react-css-themr';
import { TEXT_AREA } from './identifiers';
import FormFieldSkin from './FormFieldSkin';
import TextArea from '../../components/TextArea';
import DefaultTextAreaTheme from '../../themes/simple/SimpleTextArea.scss';

export default themr(TEXT_AREA, DefaultTextAreaTheme, { withRef: true })((props) => (
  <FormFieldSkin input={
    <textarea
      {...pickDOMProps(props)}
      className={classnames([
        props.className,
        props.theme.textarea,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null,
      ])}
      ref={textarea => {
        props.component.registerSkinPart(TextArea.SKIN_PARTS.TEXT_AREA, textarea);
      }}
    />
  } {...props} />
));
