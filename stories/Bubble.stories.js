import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Bubble from '../source/components/Bubble';
import RawBubble from '../source/skins/simple/raw/ButtonSkin'
import SimpleBubbleSkin from '../source/skins/simple/BubbleSkin';
import styles from './Bubble.stories.scss';

storiesOf('Bubble', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: null,
      onChange: mobxAction((value, event) => {
        state.value = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <Bubble />
  ))

//  .add('isOpeningUpward', () => (
//    <Bubble isOpeningUpward />
//  ))
//
//  .add('isTransparent={false}', () => (
//    <Bubble isTransparent={false} />
//  ));
