// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { ProgressBar } from '../source/components/ProgressBar';

// skins
import { ProgressBarSkin } from '../source/skins/simple/ProgressBarSkin';

// styles
import styles from './ProgressBar.stories.scss';
import themeOverrides from './theme-overrides/customProgressBar.scss';

storiesOf('ProgressBar', module)
  // ====== ProgressBar Stories ======

  .add('default - 30%', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar progress={30} skin={ProgressBarSkin} />
    </div>
  ))

  .add('default - 50%', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar progress={50} skin={ProgressBarSkin} />
    </div>
  ))

  .add('default - 100%', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar progress={100} skin={ProgressBarSkin} />
    </div>
  ))

  .add('theme overrides - 100%', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar
        progress={100}
        themeOverrides={themeOverrides}
        skin={ProgressBarSkin}
      />
    </div>
  ));
