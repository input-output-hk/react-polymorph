import React from "react";

// external libraries
import ReactModal from "react-modal";

export default props => (
  <ReactModal
    contentLabel={props.contentLabel}
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick={props.triggerCloseOnOverlayClick}
    className={props.theme[props.themeId].modal}
    overlayClassName={props.theme[props.themeId].overlay}
    ariaHideApp={false}
  >
    {props.children}
  </ReactModal>
);
