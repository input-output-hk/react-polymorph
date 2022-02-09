// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { Input } from '../source/components/Input';

// themes
import CustomInputTheme from './theme-customizations/Input.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customInput.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Input', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add(
    'plain',
    withState({ value: '' }, (store) => (
      <Input
        value={store.state.value}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, (store) => (
      <Input
        label="Click Me to Focus"
        value={store.state.value}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'placeholder',
    withState({ value: '' }, (store) => (
      <Input
        value={store.state.value}
        placeholder="user name"
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'autoFocus',
    withState({ value: '' }, (store) => (
      <Input
        autoFocus
        label="With autoFocus"
        value={store.state.value}
        placeholder="autoFocus"
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add('disabled', () => (
    <Input disabled label="Disabled Input" placeholder="user name" />
  ))

  .add(
    'error (on focus & hover)',
    withState({ value: '' }, (store) => (
      <Input
        label="With Error on focus & hover"
        error="Something went wrong"
        value={store.state.value}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'custom error (only on focus)',
    withState({ value: '' }, (store) => (
      <Input
        label="Custom Error only on focus"
        error="Something went wrong"
        value={store.state.value}
        onChange={(value) => store.set({ value })}
        isShowingErrorOnHover={false}
        themeVariables={{
          '--rp-input-border-color-errored': 'orange',
          '--rp-pop-over-bg-color': 'orange',
        }}
      />
    ))
  )

  .add(
    'error (only on hover)',
    withState({ value: '' }, (store) => (
      <Input
        label="With Error only on focus"
        error="Something went wrong"
        value={store.state.value}
        onChange={(value) => store.set({ value })}
        isShowingErrorOnFocus={false}
      />
    ))
  )

  .add(
    'minLength(8)',
    withState({ value: '' }, (store) => (
      <Input
        label="Minimum 8 Characters"
        value={store.state.value}
        placeholder="min length"
        minLength={8}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'maxLength(5)',
    withState({ value: '' }, (store) => (
      <Input
        label="Maximum 5 Characters"
        value={store.state.value}
        placeholder="max length"
        maxLength={5}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'type=password',
    withState({ value: '' }, (store) => (
      <Input
        value={store.state.value}
        type="password"
        placeholder="password"
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'onFocus / onBlur',
    withState({ value: '', focused: false, blurred: false }, (store) => (
      <Input
        label="See the State Tab Below"
        value={store.state.value}
        placeholder="onFocus / onBlur"
        onChange={(value) => store.set({ value })}
        onFocus={() => store.set({ focused: true, blurred: false })}
        onBlur={() => store.set({ blurred: true, focused: false })}
      />
    ))
  )

  .add(
    'onKeyPress',
    withState({ value: '' }, (store) => (
      <Input
        label="Type to See Events Logged"
        value={store.state.value}
        placeholder="max 5 characters"
        maxLength={5}
        onKeyPress={action('onKeyPress')}
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'theme overrides, minLength(8)',
    withState({ value: '' }, (store) => (
      <Input
        label="Composed Theme"
        minLength={8}
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="type here..."
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'custom theme',
    withState({ value: '' }, (store) => (
      <Input
        label="Custom Theme"
        theme={CustomInputTheme}
        value={store.state.value}
        placeholder="type here..."
        onChange={(value) => store.set({ value })}
      />
    ))
  )
  .add(
    'with html attributes',
    withState({ value: '' }, (store) => (
      <Input
        value={store.state.value}
        onChange={(value) => store.set({ value })}
        data-testid="testId"
        id="input1"
        label="Click Me to Focus"
      />
    ))
  );
