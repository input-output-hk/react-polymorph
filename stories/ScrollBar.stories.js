// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { ScrollBar } from '../source/components/ScrollBar';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('ScrollBar', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => (
    <ScrollBar style={{ height: '1000px' }}>
      <p>Scroll Me</p>
    </ScrollBar>
  ));
