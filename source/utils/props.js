import PropTypes from 'prop-types';
import filterReactDomProps from 'filter-react-dom-props';

export const pickDOMProps = filterReactDomProps;

export const StringOrElement = PropTypes.oneOfType([PropTypes.string, PropTypes.element]);
