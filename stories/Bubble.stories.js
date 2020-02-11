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

  .add('noArrow', () => (
    <div className={styles.container}>
      The bubble should have no arrow
      <Bubble noArrow>
        no arrow, no distance!
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

  .add('isFloating noArrow', () => (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        <Bubble isFloating noArrow>
          floating noArrow
        </Bubble>
      </div>
      <p>
        Here is some text that should break<br />
        and trigger scroll bars<br />
      </p>
    </div>
  ))

  .add('isFloating isOpeningUpward', () => (
    <div className={styles.scrollContainer}>
      <p>
        Here is some text that should break
      </p>
      <div className={styles.scrollContent}>
        <Bubble isFloating isOpeningUpward>
          floating above content opening upward
        </Bubble>
      </div>
    </div>
  ))

  .add('isCentered', () => (
    <div className={styles.container} style={{ width: '200px' }}>
      Bubble should be centered below me without stretching the full width
      <Bubble isCentered>
        centered below
      </Bubble>
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
