import React from "react";

// external libraries
import classnames from "classnames";

// internal utility functions
import { pickDOMProps } from "../../utils";

export default props => (
  <input
    ref={props.inputRef}
    {...pickDOMProps(props)}
    className={classnames([
      props.theme[props.themeId].input,
      props.disabled ? props.theme[props.themeId].disabled : null,
      props.error ? props.theme[props.themeId].errored : null
    ])}
    readOnly={props.readOnly}
  />
);
