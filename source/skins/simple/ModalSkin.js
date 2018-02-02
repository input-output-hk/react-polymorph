import React from 'react';

// external libraries
import ReactModal from 'react-modal';

export default props => (
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
);
