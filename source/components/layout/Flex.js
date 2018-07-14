// @flow
import React, { Component } from 'react';
import { Base } from './Base';

type Props = {
  row: boolean,
  column: boolean,
  rowReverse: boolean,
  columnReverse: boolean,
  nowrap: boolean,
  wrap: boolean,
  wrapReverse: boolean
};

export class Flex extends Component<Props> {
  render() {
    // TODO: Pass Flex properties down to Base for composition
    const fakeStylesFromUser = {};

    return (
      <Base enhancements={fakeStylesFromUser}>{this.props.children}</Base>
    );
  }
}
