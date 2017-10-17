import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Checkbox from '../source/components/Checkbox';
import SimpleSwitchSkin from '../source/skins/simple/SwitchSkin';

storiesOf('Switch', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      checked: false,
      onChange: mobxAction((value, event) => {
        state.checked = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Checkbox skin={<SimpleSwitchSkin />} />)

  .add('disabled', () => <Checkbox disabled skin={<SimpleSwitchSkin />} />)

  .add('short label', () => <Checkbox label="My switch" skin={<SimpleSwitchSkin />} />)

  .add('disabled with label', () => (
    <Checkbox
      disabled
      label="My switch"
      skin={<SimpleSwitchSkin />}
    />
  ))

  .add('long label', () => (
    <Checkbox
      skin={<SimpleSwitchSkin />}
      label="I understand that if this application is moved to another device or deleted,
             my money can be only recovered with the backup phrase which
             were written down in a secure place"
    />
  ));
