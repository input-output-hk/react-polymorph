// @flow
import { pickBy, isEmpty } from 'lodash';

type GridItemProps = {
  alignSelf: string,
  column: string | number,
  columnStart: string | number,
  columnEnd: string | number,
  gridArea: string,
  justifySelf: string,
  placeSelf: string,
  row: string | number,
  rowEnd: string | number,
  rowStart: string | number,
};

export const assembleInlineGridItem = (gridItemProps: GridItemProps) => {
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
};

// the baseStyles obj will be composed with the stylesToAdd obj
// activeClasses is an array of the classes within stylesToAdd
// that should be added to baseStyles
export const composeBaseStyles = (
  baseStyles: Object,
  stylesToAdd: Object = {},
  activeClasses: Array<string>
) => {
  if (!activeClasses || !activeClasses.length) { return baseStyles; }
  const composedBase = { ...baseStyles };

  activeClasses.forEach(className => {
    if (Object.hasOwnProperty.call(stylesToAdd, className) && stylesToAdd[className]) {
      composedBase.base += ` ${stylesToAdd[className]}`;
    }
  });

  return composedBase;
};

export const formatTemplateAreas = (areas: Array<''>) => {
  if (!areas || !areas.length) { return; }

  return areas.reduce((template, row, index) => {
    if (!index) { return `'${row}'`; }
    return `${template} '${row}'`;
  }, '');
};
