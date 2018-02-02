import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Bubble from '../source/components/Bubble';

// skins
import SimpleBubbleSkin from '../source/skins/simple/BubbleSkin';

// themes
import { SimpleBubbleTheme } from '../source/themes/simple';

// custom styles
import styles from './Bubble.stories.scss';

storiesOf('Bubble', module)
  .addDecorator(story => {
    const SimpleTheme = { bubble: { ...SimpleBubbleTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <div className={styles.container}>
      <Bubble skin={SimpleBubbleSkin}>plain bubble</Bubble>
    </div>
  ))

  .add('isOpeningUpward', () => (
    <div className={styles.container}>
      <Bubble isOpeningUpward skin={SimpleBubbleSkin}>
        isOpeningUpward bubble
      </Bubble>
    </div>
  ))

  .add('isTransparent={false}', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false} skin={SimpleBubbleSkin}>
        solid bubble
      </Bubble>
    </div>
  ))

  .add('custom class', () => (
    <div className={styles.container}>
      <Bubble className={styles.customBubble} skin={SimpleBubbleSkin}>
        this bubble is right aligned;
      </Bubble>
    </div>
  ))

  .add('content-light', () => (
    <div className={styles.container}>
      <Bubble skin={SimpleBubbleSkin}>tiny</Bubble>
    </div>
  ));
