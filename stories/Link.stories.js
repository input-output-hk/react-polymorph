// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import { Link } from '../source/components/Link';

// themes
import { SimpleTheme } from '../source/themes/simple';
import CustomLinkTheme from './theme-customizations/Link.custom.scss';

// custom styles & theme overrides
import themeOverrides from './theme-overrides/customLink.scss';
import styles from './Link.stories.scss';
import { IDENTIFIERS } from '../source/components';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';


storiesOf('Link', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('Default', () => (
    <Link
      label="Link label"
      onClick={action('onClick')}
    />
  ))

  .add('Long link in Block', () => (
    <div className={styles.linkBlockWrapper}>
      <Link
        label="kcjzk26oabc62s0euz4xztbjcyp732yuk14yidr58vlr572n3ybd1y39gche60t9pfeb4mqwottz2i6g2g9h4p6vpppgfozkok2wk3n90hq4"
        onClick={action('onClick')}
      />
    </div>
  ))

  .add('Without icon', () => (
    <Link
      label="Link label"
      hasIconAfter={false}
      onClick={action('onClick')}
    />
  ))

  .add('Not underlined', () => (
    <Link
      label="Link label"
      isUnderlined={false}
      onClick={action('onClick')}
    />
  ))

  .add('Underlined on hover', () => (
    <Link
      label="Link label"
      underlineOnHover
      onClick={action('onClick')}
    />
  ))

  .add('Theme overrides', () => (
    <Link
      label="Link label"
      underlineOnHover
      themeOverrides={themeOverrides}
      themeId={IDENTIFIERS.LINK}
      onClick={action('onClick')}
    />
  ))

  .add('Custom theme', () => (
    <Link
      label="Link label"
      theme={{ ...SimpleTheme, [IDENTIFIERS.LINK]: CustomLinkTheme }}
      themeId={IDENTIFIERS.LINK}
      onClick={action('onClick')}
    />
  ));
