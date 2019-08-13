// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Dropdown } from '../source/components/Dropdown';

// custom styles
import styles from './Dropdown.stories.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Dropdown', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('options',
    withState({ value: '' }, store => (
      <Dropdown
        label="test"
        activeItem={store.state.value}
        onChange={value => store.set({ value })}
        items={['first', 'second']}
      />
    ))
  );
