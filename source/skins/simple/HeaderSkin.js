// @flow
import React from 'react';
import type { Element } from 'react';
import { Base } from '../../components/layout/Base';

type Props = {
  activeClasses: Array<''>,
  children: Element<*>,
  className: string,
  inlineStyles: Object,
  stylesToAdd: Object
};

export const HeaderSkin = (props: Props) => (
  <Base
    activeClasses={props.activeClasses}
    className={props.className}
    inlineStyles={props.inlineStyles}
    stylesToAdd={props.stylesToAdd}
  >
    {props.children}
  </Base>
);
