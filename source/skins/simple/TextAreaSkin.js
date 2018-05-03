import React from 'react';

// external libraries
import classnames from 'classnames';

// import utility functions
import { pickDOMProps } from '../../utils';

export default props => {
  const { theme, themeId } = props;
  return (
    <textarea
      ref={props.textareaRef}
      {...pickDOMProps(props)}
      className={classnames([
        theme[themeId].textarea,
        props.disabled ? theme[themeId].disabled : null,
        props.error ? theme[themeId].errored : null
      ])}
    />
  );
};
