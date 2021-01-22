// @flow
import React from 'react';
import BigNumber from 'bignumber.js';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { NumericInput } from '../source/components/NumericInput';

// themes
import CustomInputTheme from './theme-customizations/Input.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customInput.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('NumericInput', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add(
    'plain',
    withState({ value: null }, (store) => (
      <NumericInput
        onChange={(value) => store.set({ value })}
        value={store.state.value}
      />
    ))
  )
  .add(
    'value (9999.99)',
    withState({ value: new BigNumber(9999.99) }, (store) => (
      <NumericInput
        onChange={(value) => store.set({ value })}
        value={store.state.value}
      />
    ))
  )
  .add(
    'decimalPlaces (6)',
    withState({ value: new BigNumber(0) }, (store) => (
      <NumericInput
        onChange={(value) => store.set({ value })}
        decimalPlaces={6}
        value={store.state.value}
      />
    ))
  )
  .add(
    'format: decimal (comma) group (dot)',
    withState({ value: new BigNumber(0) }, (store) => (
      <NumericInput
        onChange={(value) => store.set({ value })}
        bigNumberFormat={{
          decimalSeparator: ',',
          groupSeparator: '.',
        }}
        decimalPlaces={2}
        value={store.state.value}
      />
    ))
  )
  .add(
    'format: decimal (dot) group (space)',
    withState({ value: new BigNumber(0) }, (store) => (
      <NumericInput
        onChange={(value) => store.set({ value })}
        bigNumberFormat={{
          decimalSeparator: '.',
          groupSeparator: ' ',
        }}
        decimalPlaces={2}
        value={store.state.value}
      />
    ))
  )
  .add(
    'autoFocus',
    withState({ value: null }, (store) => (
      <NumericInput
        autoFocus
        onChange={(value) => store.set({ value })}
        value={store.state.value}
      />
    ))
  )
  .add(
    'label',
    withState({ value: null }, (store) => (
      <NumericInput
        label="Amount"
        onChange={(value) => store.set({ value })}
        value={store.state.value}
      />
    ))
  )
  .add(
    'placeholder',
    withState({ value: null }, (store) => (
      <NumericInput
        value={store.state.value}
        onChange={(value) => store.set({ value })}
        placeholder="18.000000"
      />
    ))
  )
  .add(
    'allowSigns = false',
    withState({ value: null }, (store) => (
      <NumericInput
        value={store.state.value}
        onChange={(value) => store.set({ value })}
        allowSigns={false}
      />
    ))
  )
  .add(
    'onFocus / onBlur',
    withState({ value: null, focused: false, blurred: false }, (store) => (
      <NumericInput
        value={store.state.value}
        placeholder="onFocus / onBlur"
        onChange={(value) => store.set({ value })}
        onFocus={() => store.set({ focused: true, blurred: false })}
        onBlur={() => store.set({ blurred: true, focused: false })}
      />
    ))
  )

  .add(
    'with error',
    withState({ value: null }, (store) => (
      <NumericInput
        label="Amount"
        error="Please enter a valid amount"
        value={store.state.value}
        placeholder="0.000000"
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'theme overrides',
    withState({ value: null }, (store) => (
      <NumericInput
        label="Composed Theme"
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="0.000000"
        onChange={(value) => store.set({ value })}
      />
    ))
  )

  .add(
    'Custom Theme',
    withState({ value: null }, (store) => (
      <NumericInput
        label="Amount"
        theme={CustomInputTheme}
        value={store.state.value}
        placeholder="0.000000"
        onChange={(value) => store.set({ value })}
      />
    ))
  );
