// @flow
import React, { Component } from 'react';
import { pickBy, isEmpty } from 'lodash';

// components
import { Base } from './Base';
import { GridItem } from './GridItem';

// styles
import gridStyles from '../../themes/simple/layout/Grid.scss';

// utilities
import { formatFlexProps } from '../../utils/layout';
import { numberToPx } from '../../utils/props';

type Props = {
  className: string,
  columns: string,
  columnGap: string | number,
  gap: string | number,
  autoColumns: string,
  autoRows: string,
  rows: string,
  rowGap: string | number
};

export class Grid extends Component<Props> {
  // creates obj passed Base component's inline styles (see render)
  _assembleInlineGrid = () => {
    const { className, ...gridProps } = this.props;

    // return early if gridProps are empty
    if (isEmpty(pickBy({ ...gridProps }))) return {};

    const {
      columns,
      rows,
      gap,
      columnGap,
      rowGap,
      autoColumns,
      autoRows
    } = this.props;

    // obj with correct css grid class names
    const inlineClasses = {
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gridGap: numberToPx(gap),
      gridColumnGap: numberToPx(columnGap),
      gridRowGap: numberToPx(rowGap)
    };

    // grid-gap is shorthand defining both colum & row gaps
    // makes individual definitions unnecessary
    if (inlineClasses.gridGap) {
      inlineClasses.gridColumnGap = false;
      inlineClasses.gridRowGap = false;
    }

    // filters out keys with false(sy) values
    return pickBy(inlineClasses);
  }

  render() {
    const { children, className, ...gridProps } = this.props;
    // filters out keys with false(sy) values
    const activeProps = pickBy(({ grid: true, ...gridProps }));
    const activeClasses = Object.keys(formatFlexProps(activeProps));
    const inlineGrid = this._assembleInlineGrid({ ...gridProps });

    return (
      <Base
        className={className}
        stylesToAdd={gridStyles}
        activeClasses={activeClasses}
        inlineStyles={inlineGrid}
      >
        {children}
      </Base>
    );
  }
}

Grid.Item = GridItem;
