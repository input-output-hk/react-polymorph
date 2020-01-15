// @flow
import React from 'react';

// external libraries
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
  children: Node,
  className: string,
  style: Object,
  theme: Object,
  themeId: string
};

export const ScrollBarSkin = (props: Props) => {
  const { children, style, themeId } = props;
  const theme = props.theme[themeId];

  const renderThumb = (thumbProps: any) => <div {...thumbProps} className={theme.thumb} />;

  return (
    <Scrollbars
      style={style}
      renderThumbVertical={renderThumb}
    >
      {children}
    </Scrollbars>
  );
};
