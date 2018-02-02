import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Tooltip from '../source/components/Tooltip';

// skins
import SimpleTooltipSkin from '../source/skins/simple/TooltipSkin';

// themes
import { SimpleTooltipTheme } from '../source/themes/simple';

// custom styles
import styles from './Tooltip.stories.scss';

storiesOf('Tooltip', module)
  .addDecorator(story => {
    const SimpleTheme = { tooltip: { ...SimpleTooltipTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <div className={styles.container}>
      <Tooltip
        skin={SimpleTooltipSkin}
        tip="plain tooltip, nothing special about me"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('html', () => (
    <div className={styles.container}>
      <Tooltip
        skin={SimpleTooltipSkin}
        tip={
          <div>
            I can use <span className={styles.htmlTip}>HTML</span>
          </div>
        }
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isAligningRight', () => (
    <div className={styles.container}>
      <Tooltip
        isAligningRight
        skin={SimpleTooltipSkin}
        tip="I am aligning right"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isBounded', () => (
    <div className={styles.container}>
      <Tooltip
        isBounded
        skin={SimpleTooltipSkin}
        tip="Help, I am stuck in this small box"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('with custom class', () => (
    <div className={styles.container}>
      <Tooltip
        className={styles.customTooltip}
        skin={SimpleTooltipSkin}
        tip="How did I get all the way over here?"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isOpeningUpward={false}', () => (
    <div className={styles.container}>
      <Tooltip
        isOpeningUpward={false}
        skin={SimpleTooltipSkin}
        tip="I come from a land down under"
      >
        hover over me
      </Tooltip>
    </div>
  ));
