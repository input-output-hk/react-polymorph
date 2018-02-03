import { oneOfType, string, element } from 'prop-types';
import filterReactDomProps from 'filter-react-dom-props';

// filters out / prevents invalid props from being rendered to the dom
// which would generate an error/warning
const pickDOMProps = filterReactDomProps;

// ensures that a prop passed to a component is either a string or element
const StringOrElement = oneOfType([ string, element ]);

export default {
  pickDOMProps,
  StringOrElement
};
