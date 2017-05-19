import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Button from '../source/components/Button';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';

storiesOf('Button', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
      onChange: mobxAction((value, event) => {
        state.value = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Button label="Button label" skin={<SimpleButtonSkin />} />)

  .add('disabled', () => <Button label="Button label" disabled skin={<SimpleButtonSkin />} />);
