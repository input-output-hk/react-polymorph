// @flow
import React from 'react';
import type { Node } from 'react';

// external libraries
import ReactModal from 'react-modal';

type Props = {
  children: Node,
  contentLabel: string | Node,
  isOpen: boolean,
  onClose: Function,
  triggerCloseOnOverlayClick: boolean,
  theme: Object,
  themeId: string
};

export default (props: Props) => (
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
