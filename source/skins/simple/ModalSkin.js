import React from 'react';
import { themr } from 'react-css-themr';
import { MODAL } from './identifiers';
import DefaultModalTheme from '../../themes/simple/SimpleModal.scss';
import ModalSkin from './raw/ModalSkin';

export default themr(MODAL, DefaultModalTheme)(ModalSkin);
