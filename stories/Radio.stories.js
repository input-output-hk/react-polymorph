import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Radio from '../source/components/Radio';
import SimpleRadioSkin from '../source/skins/simple/RadioSkin';

storiesOf('Radio', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      selected: false,
      onChange: mobxAction((value, event) => {
        state.selected = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Radio skin={<SimpleRadioSkin />} />)

  .add('disabled', () => <Radio disabled skin={<SimpleRadioSkin />} />)

  .add('short label', () => <Radio label="My radio" skin={<SimpleRadioSkin />} />)

  .add('disabled with label', () => (
    <Radio
      disabled
      label="My radio"
      skin={<SimpleRadioSkin />}
    />
  ))

  .add('long label', () => (
    <Radio
      skin={<SimpleRadioSkin />}
      label="I understand that if this application is moved to another device or deleted,
             my money can be only recovered with the backup phrase which
             were written down in a secure place"
    />
  ))

  .add('html label', () => (
    <Radio
      skin={<SimpleRadioSkin />}
      label={<div>Example for a <strong>bold</strong> word in an html label</div>}
    />
  ));
