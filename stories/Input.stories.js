import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';

import FormField from '../source/components/FormField';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import simpleFormField from '../source/themes/simple/SimpleFormField.scss';

import Input from '../source/components/Input';
import SimpleInputSkin from '../source/skins/simple/InputSkin';
import simpleInput from '../source/themes/simple/SimpleInput.scss';

storiesOf('Input', module)
  .addDecorator(story => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
      onChange: mobxAction(event => {
        event.persist();
        state.value = event.target.value;
        onChangeAction(state.value, event);
      })
    });

    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Input skin={SimpleInputSkin} theme={simpleInput} />)

  .add('label', () => (
    <FormField
      label="Some label"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <Input {...props} skin={SimpleInputSkin} theme={simpleInput} />
      )}
    />
  ))

  .add('placeholder', () => (
    <Input placeholder="Username" skin={SimpleInputSkin} theme={simpleInput} />
  ))

  .add('auto focus', () => (
    <Input
      autoFocus
      placeholder="Username"
      skin={SimpleInputSkin}
      theme={simpleInput}
    />
  ))

  .add('disabled', () => (
    <FormField
      label="Disabled Input"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <Input
          disabled
          placeholder="disabled"
          skin={SimpleInputSkin}
          theme={simpleInput}
        />
      )}
    />
  ))

  .add('error', () => (
    <div>
      <FormField
        label="With label"
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => <Input skin={SimpleInputSkin} theme={simpleInput} />}
      />

      <FormField
        error="Requires at least 8 characters"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input value="Franz" skin={SimpleInputSkin} theme={simpleInput} />
        )}
      />
    </div>
  ))

  .add('type=password', () => {
    return (
      <Input
        value="secret"
        type="password"
        skin={SimpleInputSkin}
        theme={simpleInput}
      />
    );
  })

  .add('focus / blur', () => {
    const onFocus = () => console.log('focused');

    const onBlur = () => console.log('blurred');

    return (
      <div>
        <Input
          placeholder="click me"
          onFocus={onFocus}
          onBlur={onBlur}
          skin={SimpleInputSkin}
          theme={simpleInput}
        />
      </div>
    );
  })

  .add('maxLength(5)', () => (
    <FormField
      label="Input with max. 5 Characters"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <Input
          {...props}
          maxLength={5}
          skin={SimpleInputSkin}
          theme={simpleInput}
        />
      )}
    />
  ))

  .add('onChange / onKeyPress', () => {
    return (
      <FormField
        label="Type to see events logged"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <Input
            {...props}
            onKeyPress={action('onKeyPress')}
            skin={SimpleInputSkin}
            theme={simpleInput}
          />
        )}
      />
    );
  });
