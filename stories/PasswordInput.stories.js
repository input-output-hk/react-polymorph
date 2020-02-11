// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { PasswordInput } from '../source/components/PasswordInput';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// custom styles & theme overrides
import styles from './PasswordInput.stories.scss';

storiesOf('PasswordInput', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======
  .add('empty',
    withState({ value: '' }, store => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          placeholder="Hint"
          onChange={value => store.set({ value })}
          tooltip="Regular tooltip"
        />
      </div>
    ))
  )
  .add('error',
    withState({ value: 'test' }, store => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          onChange={value => store.set({ value })}
          tooltip="Password doesn't match"
          score={0.1}
          state={PasswordInput.STATE.ERROR}
        />
      </div>
    ))
  )
  .add('warning',
    withState({ value: 'test' }, store => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          onChange={value => store.set({ value })}
          tooltip="Warning message"
          score={0.5}
          state={PasswordInput.STATE.WARNING}
        />
      </div>
    ))
  )
  .add('success',
    withState({ value: 'test' }, store => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          onChange={value => store.set({ value })}
          tooltip="Excellent"
          score={0.8}
          state={PasswordInput.STATE.SUCCESS}
        />
      </div>
    ))
  );
