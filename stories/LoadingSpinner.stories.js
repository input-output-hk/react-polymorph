// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { LoadingSpinner } from '../source/components/LoadingSpinner';

// // theme overrides and styles
import dashedSpinner from './theme-overrides/dashedSpinner.scss';
import adaSpinner from './theme-overrides/adaSpinner.scss';
import daedalusSpinner from './theme-overrides/daedalusSpinner.scss';
import styles from './LoadingSpinner.stories.scss';
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('LoadingSpinner', module)

  .addDecorator(decorateWithSimpleTheme)

  // ======  Stories ======

  .add('small', () => (
    <div className={styles.marginWrapper}>
      <LoadingSpinner />
    </div>
  ))

  .add('big', () => (
    <div className={styles.marginWrapper}>
      <LoadingSpinner big />
    </div>
  ))

  .add('theme overrides - Dashed spinner', () => (
    <div className={styles.marginWrapper}>
      <LoadingSpinner
        big
        themeOverrides={dashedSpinner}
      />
    </div>
  ))

  .add('theme overrides - ADA spinner', () => (
    <div className={styles.marginWrapper}>
      <LoadingSpinner
        big
        themeOverrides={adaSpinner}
      />
    </div>
  ))

  .add('theme overrides - Daedalus spinner', () => (
    <div className={styles.marginWrapper}>
      <LoadingSpinner
        big
        themeOverrides={daedalusSpinner}
      />
    </div>
  ));
