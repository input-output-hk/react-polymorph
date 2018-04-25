import React from "react";

// external libraries
import classnames from "classnames";

// internal utility functions
import { pickDOMProps } from "../../utils";

export default props => (
  <button
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
      props.disabled ? props.theme[props.themeId].disabled : null
    ])}
  >
    {props.label}
  </button>
);
