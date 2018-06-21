// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { NumericInput } from '../source/components';

// skins
import { InputSkin } from '../source/skins/simple';

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

  .add('send amount - label',
    withState({ value: '' }, store => (
      <NumericInput
        label="Some label"
        value={store.state.value}
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('send amount - placeholder',
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

  .add('send amount - focus / blur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="focus / blur"
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true })}
        onBlur={() => store.set({ blurred: true })}
        skin={InputSkin}
      />
    ))
  )

  .add('send amount - error',
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

  .add('send amount - beforeDot(3) and afterDot(4)',
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

  .add('send amount - maxValue(30000) - unenforced',
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

  .add('send amount - minValue(50) - unenforced',
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

  .add('send amount - maxValue(30000), minValue(50) - unenforced',
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

  .add('send amount - maxValue(30000), minValue(50), enforceMax=true, enforceMin=true',
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

  .add('send amount - onChange',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="0.000000"
        maxBeforeDot={12}
        maxAfterDot={6}
        maxValue={45000000000}
        minValue={0.000001}
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
