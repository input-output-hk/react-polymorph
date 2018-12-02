// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Bubble } from '../source/components/Bubble';

// themes
import BubbleCustomTheme from './theme-customizations/Bubble.custom.scss';

// custom styles & theme overrides
import styles from './Bubble.stories.scss';
import themeOverrides from './theme-overrides/customBubble.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Bubble', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => (
    <div className={styles.container}>
      <Bubble>plain bubble</Bubble>
    </div>
  ))

  .add('isOpeningUpward', () => (
    <div className={styles.container}>
      <Bubble isOpeningUpward>
        isOpeningUpward bubble
      </Bubble>
    </div>
  ))

  .add('isTransparent={false}', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false}>
        solid bubble
      </Bubble>
    </div>
  ))

  .add('custom class', () => (
    <div className={styles.container}>
      <Bubble className={styles.customBubble}>
        this bubble is right aligned;
      </Bubble>
    </div>
  ))

  .add('isHidden', () => (
    <div className={styles.container}>
      There should be no bubble shown!
      <Bubble isHidden>
        should not be visible!
      </Bubble>
    </div>
  ))

  .add('isFloating', () => (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        <Bubble isFloating>
          floating above scroll content
        </Bubble>
      </div>
      <p>
        Here is some text that should break<br />
        and trigger scroll bars<br />
      </p>
    </div>
  ))

  .add('theme overrides', () => (
    <div className={styles.container}>
      <Bubble
        isTransparent={false}
        themeOverrides={themeOverrides}
      >
        theme overrides
      </Bubble>
    </div>
  ))

  .add('custom theme', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false} theme={BubbleCustomTheme}>
        custom theme
      </Bubble>
    </div>
  ));
