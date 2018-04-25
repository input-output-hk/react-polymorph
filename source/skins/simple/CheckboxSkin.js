import React from "react";

// external libraries
import classnames from "classnames";

// internal utility functions
import { pickDOMProps } from "../../utils";

export default props => (
  <div
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
      props.disabled ? props.theme[props.themeId].disabled : null,
      props.checked ? props.theme[props.themeId].checked : null
    ])}
    onClick={event => {
      if (!props.disabled && props.onChange) {
        props.onChange(!props.checked, event);
      }
    }}
  >
    <input
      {...pickDOMProps(props)}
      className={props.theme[props.themeId].input}
      type="checkbox"
    />
    <div
      className={classnames([
        props.theme[props.themeId].check,
        props.checked ? props.theme[props.themeId].checked : null
      ])}
    />
    {props.label ? (
      <label className={props.theme[props.themeId].label}>{props.label}</label>
    ) : null}
  </div>
);
