// @flow
import { withState } from '@dump247/storybook-state';
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { Input } from '../source/components/Input';

// components

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// custom styles & theme overrides
import styles from './FormField.stories.scss';

storiesOf('FormField', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add(
    'input error',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <Input
          label="Enter 'error':"
          value={store.state.value}
          onChange={(value) => store.set({ value })}
          error={store.state.value === 'error' ? 'wrong value' : null}
        />
      </div>
    ))
  );
