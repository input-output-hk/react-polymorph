import React from "react";
import { omit } from "lodash";
import classnames from "classnames";

export default props => (
  <div
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
      props.disabled ? props.theme[props.themeId].disabled : null,
      props.error ? props.theme[props.themeId].errored : null
    ])}
  >
    {props.error && (
      <div className={props.theme[props.themeId].error}>{props.error}</div>
    )}
    {props.label && (
      <label
        className={props.theme[props.themeId].label}
        onClick={props.focusChild}
      >
        {props.label}
      </label>
    )}
    <div className={props.theme[props.themeId].inputWrapper}>
      {props.render(omit(props, ["themeId"]))}
    </div>
  </div>
);
