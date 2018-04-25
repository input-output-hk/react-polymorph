import React from "react";

// external libraries
import classnames from "classnames";

// components
import { Bubble } from "../../components";

// skins
import { BubbleSkin } from "./";

// internal utility functions
import { pickDOMProps } from "../../utils";

export default props => {
  const { theme, themeId } = props;
  return (
    <span
      {...pickDOMProps(props)}
      className={classnames([props.className, theme[themeId].root])}
    >
      <Bubble
        className={classnames([
          theme[themeId].bubble,
          props.isAligningRight
            ? theme[themeId].alignRight
            : theme[themeId].alignLeft,
          props.isBounded ? null : theme[themeId].nowrap
        ])}
        theme={theme}
        isOpeningUpward={props.isOpeningUpward}
        skin={BubbleSkin}
        isTransparent={props.isTransparent}
      >
        {props.tip}
      </Bubble>
      {props.children}
    </span>
  );
};
