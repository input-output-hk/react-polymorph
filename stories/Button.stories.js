import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';

import Button from '../source/components/Button';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';
import simple from '../source/themes/simple/SimpleButton.scss';
import customButton from './styles/customButton.scss';

storiesOf('Button', module)
  .addDecorator(story => {
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

  .add('plain', () => (
    <Button label="Button label" theme={simple} skin={SimpleButtonSkin} />
  ))

  .add('disabled', () => (
    <Button
      label="Button label"
      disabled
      theme={simple}
      skin={SimpleButtonSkin}
    />
  ))

  .add('composed theme', () => (
    <Button
      label="Button label"
      themeOverrides={customButton}
      theme={simple}
      skin={SimpleButtonSkin}
    />
  ));
