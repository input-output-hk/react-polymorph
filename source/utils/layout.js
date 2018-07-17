// @flow
import { isEmpty, pickBy } from 'lodash';

export const formatFlexProps = (activeProps: Object) => {
  if (isEmpty(activeProps)) { return; }

  const { justifyContent, alignItems, center } = activeProps;

  // the "center" prop sets both "justify-content" and 'align-items' to center
  if (center === true) {
    // setting the values individually is uneccessary
    // only the "center" prop will be forwarded
    activeProps.justifyContent = false;
    activeProps.alignItems = false;
    // finished, return early
    return pickBy(activeProps);
  }

  if (justifyContent) {
    switch (justifyContent) {
      case 'flex-start':
        activeProps.justifyStart = true;
        break;
      case 'flex-end':
        activeProps.justifyEnd = true;
        break;
      case 'center':
        activeProps.justifyCenter = true;
        break;
      case 'space-between':
        activeProps.justifyBetween = true;
        break;
      case 'space-around':
        activeProps.justifyAround = true;
        break;
      default:
        break;
    }
    activeProps.justifyContent = false;
  }

  if (alignItems) {
    switch (alignItems) {
      case 'flex-start':
        activeProps.alignStart = true;
        break;
      case 'flex-end':
        activeProps.alignEnd = true;
        break;
      case 'center':
        activeProps.alignCenter = true;
        break;
      case 'baseline':
        activeProps.alignBaseline = true;
        break;
      default:
        break;
    }
    activeProps.alignItems = false;
  }

  return pickBy(activeProps);
};

export const formatFlexItemProps = (activeProps: Object) => {
  if (isEmpty(activeProps)) { return; }

  const { alignSelf } = activeProps;

  if (alignSelf) {
    switch (alignSelf) {
      case 'flex-start':
        activeProps.alignStart = true;
        break;
      case 'flex-end':
        activeProps.alignEnd = true;
        break;
      case 'center':
        activeProps.alignCenter = true;
        break;
      case 'baseline':
        activeProps.alignBaseline = true;
        break;
      case 'stretch':
        activeProps.alignStretch = true;
        break;
      default:
        break;
    }
    activeProps.alignSelf = false;
  }

  return pickBy(activeProps);
};
