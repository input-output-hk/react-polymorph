// @flow
import React from 'react';

// external libraries
import classnames from 'classnames';

type Props = {
  className: string,
  progress: number,
  theme: Object,
  themeId: string
};

export const ProgressBarSkin = (props: Props) => {
  const { className, progress, themeId } = props;
  const theme = props.theme[themeId];

  return (
    <div className={classnames([className, theme.bar])}>
      <span className={theme.progress} style={{ width: `${progress}%` }} />
    </div>
  );
};
