import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import SimpleThemeProvider from './support/SimpleThemeProvider';
import PropsObserver from './support/PropsObserver';
import Input from '../source/components/Input';
import SimpleInputSkin from '../source/skins/simple/InputSkin';

storiesOf('Input', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
      onChange: mobxAction((value, event) => {
        state.value = value;
        onChangeAction(value, event);
      })
    });
    return (
      <SimpleThemeProvider>
        <PropsObserver propsForChildren={state}>
          {story()}
        </PropsObserver>
      </SimpleThemeProvider>
    );
  })

  // ====== Stories ======

  .add('plain', () => <Input skin={<SimpleInputSkin />} />)

  .add('label', () => <Input label="Some label" skin={<SimpleInputSkin />} />)

  .add('placeholder', () => <Input placeholder="Username" skin={<SimpleInputSkin />} />)

  .add('disabled', () => (
    <Input
      label="Disabled Input"
      placeholder="disabled"
      disabled
      skin={<SimpleInputSkin />}
    />
  ))

  .add('error', () => (
    <div>
      <Input label="With label" error="Something went wrong" skin={<SimpleInputSkin />} />
      <Input value="Franz" error="Requires at least 8 characters" skin={<SimpleInputSkin />} />
    </div>
  ))

  .add('type=password', () => {
    return (
      <Input value="secret" type="password" skin={<SimpleInputSkin />} />
    );
  })

  .add('focus / blur', () => {
    let input;
    return (
      <div>
        <Input
          ref={(ref) => input = ref}
          skin={<SimpleInputSkin />}
          onFocus={action('onFocus')}
          onBlur={action('onBlur')}
        />
        <button onClick={() => input.focus()}>focus</button> | <button onClick={() => input.blur()}>blur</button>
      </div>
    );
  })

  .add('maxLength(5)', () => (
    <Input
      label="Input with max. 5 Characters"
      onChange={mobxAction((value) => { state.value = value; })}
      maxLength={5}
      skin={<SimpleInputSkin />}
    />
  ))

  .add('onChange / onKeyPress', () => {
    return (
      <Input
        label="Type to see events logged"
        onKeyPress={action('onKeyPress')}
        skin={<SimpleInputSkin />}
      />
    );
  });
