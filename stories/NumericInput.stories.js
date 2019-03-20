// @flow
import React from 'react';

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

  .add('plain',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
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
      />
    ))
  )

  .add('autoFocus',
    withState({ value: '' }, store => (
      <NumericInput
        autoFocus
        label="With autoFocus"
        value={store.state.value}
        placeholder="18.000000"
        maxBeforeDot={6}
        maxAfterDot={6}
        onChange={value => store.set({ value })}
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
      />
    ))
  )

  .add('maxBeforeDot(3) and maxAfterDot(4)',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        value={store.state.value}
        placeholder="000.0000"
        maxBeforeDot={3}
        maxAfterDot={4}
        onChange={value => store.set({ value })}
      />
    ))
  )

  .add('maxBeforeDot(3) and maxAfterDot(0)',
    withState({ value: '' }, store => (
      <NumericInput
        label="Integers Only"
        value={store.state.value}
        placeholder="123"
        maxBeforeDot={3}
        maxAfterDot={0}
        onChange={value => store.set({ value })}
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
      />
    ))
  )

  .add('theme overrides, minValue(50)',
    withState({ value: '' }, store => (
      <NumericInput
        label="Composed Theme"
        minValue={50}
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="0.000000"
        maxAfterDot={6}
        onChange={value => store.set({ value })}
      />
    ))
  )

  .add('Custom Theme',
    withState({ value: '' }, store => (
      <NumericInput
        label="Amount"
        theme={CustomInputTheme}
        value={store.state.value}
        placeholder="0.000000"
        maxAfterDot={6}
        onChange={value => store.set({ value })}
      />
    ))
  );
