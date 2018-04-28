import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Bubble } from '../source/components';

// skins
import { BubbleSkin } from '../source/skins/simple';

// themes
import BubbleCustomTheme from './theme-customizations/Bubble.custom.scss';

// custom styles & theme overrides
import styles from './Bubble.stories.scss';
import themeOverrides from './theme-overrides/customBubble.scss';

storiesOf('Bubble', module)
  // ====== Stories ======

  .add('plain', () => (
    <div className={styles.container}>
      <Bubble skin={BubbleSkin}>plain bubble</Bubble>
    </div>
  ))

  .add('isOpeningUpward', () => (
    <div className={styles.container}>
      <Bubble isOpeningUpward skin={BubbleSkin}>
        isOpeningUpward bubble
      </Bubble>
    </div>
  ))

  .add('isTransparent={false}', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false} skin={BubbleSkin}>
        solid bubble
      </Bubble>
    </div>
  ))

  .add('custom class', () => (
    <div className={styles.container}>
      <Bubble className={styles.customBubble} skin={BubbleSkin}>
        this bubble is right aligned;
      </Bubble>
    </div>
  ))

  .add('isHidden', () => (
    <div className={styles.container}>
      There should be no bubble shown!
      <Bubble isHidden skin={BubbleSkin}>
        should not be visible!
      </Bubble>
    </div>
  ))

  .add('isFloating', () => (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        <Bubble isFloating skin={BubbleSkin}>
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
        skin={BubbleSkin}
      >
        theme overrides
      </Bubble>
    </div>
  ))

  .add('custom theme', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false} theme={BubbleCustomTheme} skin={BubbleSkin}>
        custom theme
      </Bubble>
    </div>
  ));
