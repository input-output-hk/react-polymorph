// @flow
import React from 'react';

type Props = {
  progress: number,
  theme: Object,
  themeId: string
};

export const ProgressBarSkin = (props: Props) => {
  const { progress, theme } = props;
  return (
    <div className={theme.bar}>
      <span className={theme.progress} style={{ width: `${progress}%` }} />
    </div>
  );
};
