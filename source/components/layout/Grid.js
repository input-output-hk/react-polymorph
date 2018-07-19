// @flow
import React, { Component } from 'react';
import { pickBy, isEmpty } from 'lodash';

// components
import { Base } from './Base';
import { GridItem } from './GridItem';

// styles
import gridStyles from '../../themes/simple/layout/Grid.scss';

// utilities
import { numberToPx } from '../../utils/props';
import { formatTemplateAreas } from '../../utils/layout';

type Props = {
  alignItems: string,
  autoColumns: string,
  autoRows: string,
  className: string,
  center: boolean,
  columnGap: string | number,
  columns: string,
  gap: string | number,
  justifyItems: string,
  rowGap: string | number,
  rows: string,
  template: string,
  templateAreas: Array<''>
};

export class Grid extends Component<Props> {
  static defaultProps = {
    columnGap: 5,
    rowGap: 5
  };

  // creates obj passed Base component's inline styles (see render)
  _assembleInlineGrid = () => {
    const { className, ...gridProps } = this.props;

    // return early if gridProps are empty
    if (isEmpty(pickBy({ ...gridProps }))) { return; }

    const {
      alignItems,
      autoColumns,
      autoRows,
      center,
      columnGap,
      columns,
      gap,
      justifyItems,
      rowGap,
      rows,
      template,
      templateAreas
    } = gridProps;

    // obj with correct css grid class names
    const inlineClasses = {
      alignItems: center ? 'center' : alignItems,
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gridColumnGap: gap ? false : numberToPx(columnGap),
      gridGap: numberToPx(gap),
      gridRowGap: gap ? false : numberToPx(rowGap),
      gridTemplate: template,
      gridTemplateAreas: formatTemplateAreas(templateAreas),
      justifyItems: center ? 'center' : justifyItems
    };

    // filters out keys with false(sy) values
    return pickBy(inlineClasses);
  }

  render() {
    const { children, className, ...gridProps } = this.props;
    const inlineGrid = this._assembleInlineGrid({ ...gridProps });

    return (
      <Base
        className={className}
        stylesToAdd={gridStyles}
        activeClasses={['grid']}
        inlineStyles={inlineGrid}
      >
        {children}
      </Base>
    );
  }
}

Grid.Item = GridItem;
