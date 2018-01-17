import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

import FormField from '../source/components/FormField';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import simpleFormField from '../source/themes/simple/SimpleFormField.scss';

import Input from '../source/components/Input';
import SimpleInputSkin from '../source/skins/simple/InputSkin';
import simpleInput from '../source/themes/simple/SimpleInput.scss';

storiesOf('Input', module)
  // ====== Stories ======

  .add(
    'Plain',
    withState({ value: '' }, store => (
      <Input
        {...store.state}
        onChange={(value, event) => store.set({ value })}
        theme={simpleInput}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        theme={simpleFormField}
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            theme={simpleInput}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'placeholder',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        placeholder="user name"
        onChange={(value, event) => store.set({ value })}
        theme={simpleInput}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'autoFocus',
    withState({ value: '' }, store => (
      <Input
        autoFocus
        value={store.state.value}
        placeholder="autoFocus"
        onChange={(value, event) => store.set({ value })}
        theme={simpleInput}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add('disabled', () => (
    <FormField
      disabled
      label="Disabled Input"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <Input
          {...props}
          placeholder="user name"
          theme={simpleInput}
          skin={SimpleInputSkin}
        />
      )}
    />
  ))

  .add(
    'error',
    withState({ value: '' }, store => (
      <FormField
        label="With Label"
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
            theme={simpleInput}
          />
        )}
      />
    ))
  )

  .add(
    'minLength(8)',
    withState({ value: '' }, store => (
      <FormField
        label="Input with min. 5 Characters"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="min length"
            minLength={8}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
            theme={simpleInput}
          />
        )}
      />
    ))
  )

  .add(
    'maxLength(5)',
    withState({ value: '' }, store => (
      <FormField
        label="Input with max. 5 Characters"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
            theme={simpleInput}
          />
        )}
      />
    ))
  )

  .add(
    'type=password',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        type="password"
        placeholder="password"
        onChange={(value, event) => store.set({ value })}
        theme={simpleInput}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'focus / blur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <Input
        value={store.state.value}
        placeholder="focus / blur"
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true })}
        onBlur={() => store.set({ blurred: true })}
        theme={simpleInput}
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'onKeyPress',
    withState({ value: '' }, store => (
      <FormField
        label="Type to see events logged"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onKeyPress={action('onKeyPress')}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
            theme={simpleInput}
          />
        )}
      />
    ))
  );
