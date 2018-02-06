import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import FormField from '../source/components/FormField';
import NumericInput from '../source/components/NumericInput';

// skins
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import SimpleInputSkin from '../source/skins/simple/InputSkin';

// themes
import {
  SimpleFormFieldTheme,
  SimpleInputTheme
} from '../source/themes/simple';

// themeOverrides
import themeOverrides from './styles/customInput.scss';

storiesOf('NumericInput', module)
  .addDecorator(story => {
    const SimpleTheme = {
      formfield: { ...SimpleFormFieldTheme },
      input: { ...SimpleInputTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })
  // ====== Stories ======

  .add(
    'Plain',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'Send amount - label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        skin={SimpleFormFieldSkin}
        render={props => (
          <NumericInput
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )
  .add(
    'Send amount - placeholder',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="18.000000"
        onChange={value => store.set({ value })}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'Send amount - focus / blur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="focus / blur"
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true })}
        onBlur={() => store.set({ blurred: true })}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'Send amount - error',
    withState({ value: '' }, store => (
      <FormField
        label="Amount"
        error="Please enter a valid amount"
        skin={SimpleFormFieldSkin}
        render={props => (
          <NumericInput
            {...props}
            value={store.state.value}
            placeholder="0.000000"
            onChange={value => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'Send amount - beforeDot(3) and afterDot(4)',
    withState({ value: '' }, store => (
      <NumericInput
        value={store.state.value}
        placeholder="0.0000"
        maxBeforeDot={3}
        maxAfterDot={4}
        onChange={value => store.set({ value })}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'Send amount - maxValue(30000)',
    withState({ value: '' }, store => (
      <FormField
        label="Amount"
        skin={SimpleFormFieldSkin}
        render={props => (
          <NumericInput
            {...props}
            value={store.state.value}
            placeholder="0.000000"
            maxValue={30000}
            onChange={value => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'Send amount - maxValue(30000) and minValue(1)',
    withState({ value: '' }, store => (
      <FormField
        label="Amount"
        skin={SimpleFormFieldSkin}
        render={props => (
          <NumericInput
            {...props}
            value={store.state.value}
            placeholder="0.000000"
            maxValue={30000}
            minValue={1}
            onChange={value => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'Send amount - onChange',
    withState({ value: '' }, store => (
      <FormField
        label="Amount"
        skin={SimpleFormFieldSkin}
        render={props => (
          <NumericInput
            {...props}
            value={store.state.value}
            placeholder="0.000000"
            maxBeforeDot={12}
            maxAfterDot={6}
            maxValue={45000000000}
            minValue={0.000001}
            onChange={value => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'composed theme',
    withState({ value: '' }, store => (
      <NumericInput
        themeOverrides={themeOverrides}
        value={store.state.value}
        placeholder="0.000000"
        onChange={value => store.set({ value })}
        skin={SimpleInputSkin}
      />
    ))
  );
