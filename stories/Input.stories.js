// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { Input } from '../source/components';

// skins
import { InputSkin } from '../source/skins/simple';

// themes
import CustomInputTheme from './theme-customizations/Input.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customInput.scss';

storiesOf('Input', module)
  // ====== Stories ======

  .add('plain',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <Input
        label="Some label"
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('placeholder',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        placeholder="user name"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('autoFocus',
    withState({ value: '' }, store => (
      <Input
        autoFocus
        value={store.state.value}
        placeholder="autoFocus"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('disabled', () => (
    <Input
      disabled
      label="Disabled Input"
      placeholder="user name"
      skin={InputSkin}
    />
  ))

  .add('with error',
    withState({ value: '' }, store => (
      <Input
        label="With Label"
        error="Something went wrong"
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('minLength(8)',
    withState({ value: '' }, store => (
      <Input
        label="Input with min. 5 Characters"
        value={store.state.value}
        placeholder="min length"
        minLength={8}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('maxLength(5)',
    withState({ value: '' }, store => (
      <Input
        label="Input with max. 5 Characters"
        value={store.state.value}
        placeholder="max length"
        maxLength={5}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('type=password',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        type="password"
        placeholder="password"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('onFocus / onBlur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <Input
        value={store.state.value}
        placeholder="onFocus / onBlur"
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true, blurred: false })}
        onBlur={() => store.set({ blurred: true, focused: false })}
        skin={InputSkin}
      />
    ))
  )

  .add('onKeyPress',
    withState({ value: '' }, store => (
      <Input
        label="Type to see events logged"
        value={store.state.value}
        placeholder="max length"
        maxLength={5}
        onKeyPress={action('onKeyPress')}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('theme overrides',
    withState({ value: '' }, store => (
      <Input
        label="Theme overrides"
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="type here..."
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('custom theme',
    withState({ value: '' }, store => (
      <Input
        label="Custom theme"
        theme={CustomInputTheme}
        value={store.state.value}
        placeholder="type here..."
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  );
