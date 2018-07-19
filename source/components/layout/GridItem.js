// @flow
import React, { Component } from 'react';
import { pickBy, isEmpty } from 'lodash';

// components
import { Base } from './Base';

type Props = {
  alignSelf: string,
  className: string,
  column: string | number,
  columnStart: string | number,
  columnEnd: string | number,
  gridArea: string,
  justifySelf: string,
  placeSelf: string,
  row: string | number,
  rowEnd: string | number,
  rowStart: string | number
};

export class GridItem extends Component<Props> {
  // creates obj passed to Base component's inlineStyles (see render)
  _assembleInlineGridItem = () => {
    const { className, ...gridItemProps } = this.props;

    // return early if gridProps are empty
    if (isEmpty(pickBy({ ...gridItemProps }))) { return; }

    const {
      alignSelf,
      column,
      columnStart,
      columnEnd,
      gridArea,
      justifySelf,
      placeSelf,
      row,
      rowEnd,
      rowStart
    } = gridItemProps;

    // obj with correct css grid-item class names
    const inlineClasses = {
      alignSelf,
      gridArea,
      gridColumn: column,
      gridColumnStart: columnStart,
      gridColumnEnd: columnEnd,
      gridRow: row,
      gridRowEnd: rowEnd,
      gridRowStart: rowStart,
      justifySelf,
      placeSelf
    };

    // filters out keys with false(sy) values
    return pickBy(inlineClasses);
  }

  render() {
    const { children, className, ...gridItemProps } = this.props;
    const inlineGridItem = this._assembleInlineGridItem({ ...gridItemProps });

    return (
      <Base className={className} inlineStyles={inlineGridItem}>
        {children}
      </Base>
    );
  }
}
