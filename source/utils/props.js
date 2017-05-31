import DOMProperty from 'react-dom/lib/DOMProperty';
import EventPluginRegistry from 'react-dom/lib/EventPluginRegistry';
import { pickBy } from 'lodash';

const reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  defaultChecked: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
};

export const pickDOMProps = (props) => pickBy(props, (_, key) => (
  DOMProperty.properties.hasOwnProperty(key) ||
  DOMProperty.isCustomAttribute(key) ||
  reactProps.hasOwnProperty(key) && reactProps[key] ||
  EventPluginRegistry.registrationNameModules.hasOwnProperty(key)
));
