import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { ThemeProvider, Tooltip } from '../source/components';

// skins
import { TooltipSkin } from '../source/skins/simple';

// themes
import SimpleTheme from '../source/themes/simple';
import CustomBubbleTheme from './theme-customizations/Bubble.custom.scss';

// custom styles & themeOverrides
import styles from './Tooltip.stories.scss';
import themeOverrides from './theme-overrides/customTooltip.scss';

storiesOf('Tooltip', module)

  .addDecorator(story => {
    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <div className={styles.container}>
      <Tooltip skin={TooltipSkin} tip="plain tooltip, nothing special about me">
        hover over me
      </Tooltip>
    </div>
  ))

  .add('html', () => (
    <div className={styles.container}>
      <Tooltip
        skin={TooltipSkin}
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
      <Tooltip isAligningRight skin={TooltipSkin} tip="I am aligning right">
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isBounded', () => (
    <div className={styles.container}>
      <Tooltip
        isBounded
        skin={TooltipSkin}
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
        skin={TooltipSkin}
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
        skin={TooltipSkin}
        tip="I come from a land down under"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('composed theme', () => (
    <div className={styles.container}>
      <Tooltip
        themeOverrides={themeOverrides}
        skin={TooltipSkin}
        isTransparent={false}
        tip="plain tooltip, with a composed theme"
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('custom theme', () => (
    <ThemeProvider theme={{
      ...SimpleTheme,
      bubble: CustomBubbleTheme,
    }}>
      <div className={styles.container}>
        <Tooltip
          skin={TooltipSkin}
          isTransparent={false}
          tip="plain tooltip, with a custom theme"
        >
          hover over me
        </Tooltip>
      </div>
    </ThemeProvider>
  ));
