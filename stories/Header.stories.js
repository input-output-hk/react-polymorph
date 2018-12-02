// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Header } from '../source/components/Header';

// themes
import CustomTheme from './theme-customizations/Header.custom.scss';

// custom styles & theme overrides
import styles from './Header.stories.scss';
import custom from './theme-overrides/customHeader.scss';
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Header', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Header Stories ======

  .add('positioning', () => (
    <div className={styles.wrapper}>
      <Header left>Wallet Name - left</Header>
      <Header center>Wallet Name - center</Header>
      <Header right>Wallet Name - right</Header>
    </div>
  ))

  .add('font', () => (
    <div className={styles.wrapper}>
      <Header thin themeOverrides={custom}>
        Wallet Name - thin
      </Header>

      <Header light themeOverrides={custom}>
        Wallet Name - light
      </Header>

      <Header regular themeOverrides={custom}>
        Wallet Name - regular
      </Header>

      <Header medium themeOverrides={custom}>
        Wallet Name - medium
      </Header>

      <Header bold themeOverrides={custom}>
        Wallet Name - bold
      </Header>
    </div>
  ))

  .add('text', () => (
    <div className={styles.wrapper}>
      <Header lowerCase>
        Wallet Name - lowerCase
      </Header>

      <Header upperCase>
        Wallet Name - upperCase
      </Header>
    </div>
  ))

  .add('simple theme', () => (
    <div className={styles.wrapper}>
      <Header h1>
        Wallet Name - h1
      </Header>

      <Header h2>
        Wallet Name - h2
      </Header>

      <Header h3>
        Wallet Name - h3
      </Header>

      <Header h4>
        Wallet Name - h4
      </Header>
    </div>
  ))

  .add('override theme - props', () => (
    <div className={styles.wrapper}>
      <Header h1 lowerCase>
        Wallet Name - h1 lowerCase
      </Header>

      <Header h2 left>
        Wallet Name - h2 left
      </Header>

      <Header h3 right>
        Wallet Name - h3 right
      </Header>

      <Header h4 upperCase>
        Wallet Name - h4 upperCase
      </Header>
    </div>
  ))

  .add('override theme - themeOverrides', () => (
    <div className={styles.wrapper}>
      <Header h1 themeOverrides={custom}>
        Wallet Name - h1
      </Header>

      <Header h2 themeOverrides={custom}>
        Wallet Name - h2
      </Header>

      <Header h3 themeOverrides={custom}>
        Wallet Name - h3
      </Header>

      <Header h4 themeOverrides={custom}>
        Wallet Name - h4
      </Header>
    </div>
  ))

  .add('override combo - props & themeOverrides', () => (
    <div className={styles.wrapper}>
      <Header h3 upperCase left themeOverrides={custom}>
        Wallet Name - h3
      </Header>
      <Header h3 upperCase right themeOverrides={custom}>
        Wallet Name - h3
      </Header>
      <Header h3 lowerCase center themeOverrides={custom}>
        Wallet Name - h3
      </Header>
    </div>
  ))

  .add('custom theme', () => (
    <div className={styles.wrapper}>
      <Header h1 theme={CustomTheme}>
        My Custom Theme
      </Header>
      <Header h1 center upperCase theme={CustomTheme}>
        My Custom Theme with Prop Overrides
      </Header>
    </div>
  ));
