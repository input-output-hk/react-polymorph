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
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('ProgressBar', module)

  .addDecorator(decorateWithSimpleTheme)

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

  .add('default - label', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar label="Pending Transaction" skin={ProgressBarSkin} />
    </div>
  ))

  .add('theme overrides - 50%', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar
        progress={50}
        themeOverrides={themeOverrides}
        skin={ProgressBarSkin}
      />
    </div>
  ))

  .add('theme overrides - label', () => (
    <div className={styles.marginWrapper}>
      <ProgressBar
        label="Pending Transaction"
        themeOverrides={themeOverrides}
        skin={ProgressBarSkin}
      />
    </div>
  ));
