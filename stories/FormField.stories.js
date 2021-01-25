// @flow
import { withState } from '@dump247/storybook-state';
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { FormField } from '../source/components/FormField';
import { Input } from '../source/components/Input';

// components

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// custom styles & theme overrides
import styles from './FormField.stories.scss';

storiesOf('FormField', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('error', () => (
    <div style={{ width: '100px', border: '1px solid black', padding: '10px' }}>
      <FormField
        error="An error is shown"
        render={() => <span>simple form field test</span>}
        isErrorShown
      />
    </div>
  ))
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
