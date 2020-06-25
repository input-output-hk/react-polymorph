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

storiesOf('PasswordInput | Logic', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======
  .add(
    'Default',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          label="Default password input"
          value={store.state.value}
          placeholder="Enter your password …"
          onChange={(value) => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    'Hard',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          minLength={12}
          entropyFactor={0.005}
          label="Hard password input"
          value={store.state.value}
          placeholder="Enter 12 character password …"
          onChange={(value) => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    'Easy',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          minLength={8}
          entropyFactor={0.015}
          label="Easy password input"
          value={store.state.value}
          placeholder="Enter 8 character password …"
          onChange={(value) => store.set({ value })}
        />
      </div>
    ))
  );

storiesOf('PasswordInput | Skin', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======
  .add(
    'custom tooltip',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          placeholder="Hint"
          onChange={(value) => store.set({ value })}
          tooltip="Regular tooltip"
          useDebounce={false}
        />
      </div>
    ))
  )
  .add(
    'custom strength feedbacks',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          passwordFeedbacks={{
            insecure: 'unsicher!',
            weak: 'schwach',
            strong: 'genial!',
            noMatch: 'Stimmt nicht überein',
          }}
          label="Label"
          value={store.state.value}
          placeholder="Passwort eingeben"
          onChange={(value) => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    'fixed default state',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          isTooltipOpen
          label="Label"
          value={store.state.value}
          placeholder="Entery anything"
          onChange={(value) => store.set({ value })}
          tooltip="Always default!"
          state={PasswordInput.STATE.DEFAULT}
          useDebounce={false}
        />
      </div>
    ))
  )
  .add(
    'tooltip only on hover',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          isShowingTooltipOnFocus={false}
          isShowingTooltipOnHover
          isTooltipOpen={false}
          label="Label"
          value={store.state.value}
          placeholder="Hint"
          onChange={(value) => store.set({ value })}
          tooltip="Regular tooltip"
        />
      </div>
    ))
  )
  .add(
    'tooltip only on focus',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          isShowingTooltipOnFocus
          isShowingTooltipOnHover={false}
          isTooltipOpen={false}
          label="Label"
          value={store.state.value}
          placeholder="Hint"
          onChange={(value) => store.set({ value })}
          tooltip="Regular tooltip"
        />
      </div>
    ))
  )
  .add(
    'tooltip on focus or hover',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          isShowingTooltipOnFocus
          isShowingTooltipOnHover
          isTooltipOpen={false}
          label="Label"
          value={store.state.value}
          placeholder="Hint"
          onChange={(value) => store.set({ value })}
          tooltip="Regular tooltip"
        />
      </div>
    ))
  )
  .add(
    'custom error',
    withState({ value: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          error="Password doesnt match"
          label="Custom Error"
          isTooltipOpen
          onChange={(value) => store.set({ value })}
          useDebounce={false}
          value={store.state.value}
        />
      </div>
    ))
  )
  .add('insecure', () => (
    <div className={styles.container}>
      <PasswordInput
        isTooltipOpen
        label="Insecure Password"
        useDebounce={false}
        value="darko"
      />
    </div>
  ))
  .add('weak', () => (
    <div className={styles.container}>
      <PasswordInput
        isTooltipOpen
        label="Weak Password"
        useDebounce={false}
        value="darkodarko"
      />
    </div>
  ))
  .add('excellent', () => (
    <div className={styles.container}>
      <PasswordInput
        isTooltipOpen
        label="Excellent Password"
        useDebounce={false}
        value="very$trongPassw0rd"
      />
    </div>
  ));

storiesOf('PasswordInput | Integration', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======
  .add(
    'Password Repeat',
    withState({ password: '', repeat: '' }, (store) => (
      <div className={styles.container}>
        <PasswordInput
          className={styles.firstField}
          label="New Password"
          value={store.state.password}
          placeholder="Enter your password …"
          onChange={(value) => store.set({ password: value })}
        />
        <PasswordInput
          label="Repeat Password"
          value={store.state.repeat}
          placeholder="Repeat your password …"
          type="password"
          onChange={(value) => store.set({ repeat: value })}
          repeatPassword={store.state.password}
          isPasswordRepeat
        />
      </div>
    ))
  );
