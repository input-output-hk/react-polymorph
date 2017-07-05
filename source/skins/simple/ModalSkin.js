import React from 'react';
// import classnames from 'classnames';
import ReactModal from 'react-modal';
// import { pickDOMProps } from '../../utils/props';
import { themr } from 'react-css-themr';
import { MODAL } from './identifiers';
import DefaultModalTheme from '../../themes/simple/SimpleModal.scss';

export default themr(MODAL, DefaultModalTheme, { withRef: true })((props) => (
  <ReactModal
    contentLabel={props.contentLabel}
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick={props.triggerCloseOnOverlayClick}
    className={props.theme.modal}
    overlayClassName={props.theme.overlay}
  >
    {props.children}
  </ReactModal>
));
