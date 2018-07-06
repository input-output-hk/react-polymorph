// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { NumericInput } from '../source/components/NumericInput';

// skins
import { InputSkin } from '../source/skins/simple/InputSkin';

// themes
import CustomInputTheme from './theme-customizations/Input.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customInput.scss';

storiesOf('NumericInput', module)
  // ====== Stories ======

  .add('plain',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('placeholder',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="18.000000"
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('autoFocus',
    withState({ value: '' }, store => (
      <NumericInput
        autoFocus
        value={store.state.value}
        placeholder="18.000000"
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('onFocus / onBlur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="onFocus / onBlur"
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true, blurred: false })}
        onBlur={() => store.set({ blurred: true, focused: false })}
        skin={InputSkin}
      />
    ))
  )

  .add('with error',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        error="Please enter a valid amount"
        value={store.state.value}
        placeholder="0.000000"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('beforeDot(3) and afterDot(4)',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="000.0000"
        maxBeforeDot={3}
        maxAfterDot={4}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('maxValue(30000) - unenforced',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="0.000000"
        maxValue={30000}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('minValue(50) - unenforced',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="0.000000"
        minValue={50}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('maxValue(30000), minValue(50) - unenforced',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="0.000000"
        maxValue={30000}
        minValue={50}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('maxValue(30000), minValue(50), enforceMax=true, enforceMin=true',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="50.000000"
        maxValue={30000}
        minValue={50}
        maxAfterDot={6}
        enforceMax
        enforceMin
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('theme overrides',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="0.000000"
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('custom theme',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        theme={CustomInputTheme}
        value={store.state.value}
        placeholder="0.000000"
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  );
