// @flow
import React from 'react';

// external libraries
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
  children: Node,
  className: string,
  theme: Object,
  themeId: string
};

export const ScrollBarSkin = (props: Props) => {
  const { children, className, themeId } = props;
  const theme = props.theme[themeId];

  const renderThumb = (thumbProps: any) => <div {...thumbProps} className={theme.thumb} />;

  return (
    <Scrollbars
      className={classnames([className, theme.root])}
      renderThumbVertical={renderThumb}
    >
      {children}
    </Scrollbars>
  );
};
