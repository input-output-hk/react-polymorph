import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { BUBBLE } from '../identifiers';

export default themr(BUBBLE)((props) => (
  <div>
    Hello World
  </div>
));
