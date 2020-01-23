// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { ScrollBar } from '../source/components/ScrollBar';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// styles
import styles from './ScrollBar.stories.scss';

storiesOf('ScrollBar', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => (
    <ScrollBar style={{ height: '1000px' }}>
      <div className={styles.padding}>
        <p>Scroll Me</p>
      </div>
    </ScrollBar>
  ));
