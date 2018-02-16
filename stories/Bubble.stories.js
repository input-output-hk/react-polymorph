import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Bubble from '../source/components/Bubble';
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
    <div className={styles.container}>
      <Bubble skin={<SimpleBubbleSkin />} >
        plain bubble
      </Bubble>
    </div>
  ))

  .add('isOpeningUpward', () => (
    <div className={styles.container}>
      <Bubble isOpeningUpward skin={<SimpleBubbleSkin />} >
        isOpeningUpward bubble
      </Bubble>
    </div>
  ))

  .add('isTransparent={false}', () => (
    <div className={styles.container}>
      <Bubble isTransparent={false} skin={<SimpleBubbleSkin />} >
        solid bubble
      </Bubble>
    </div>
  ))

  .add('custom class', () => (
    <div className={styles.container}>
      <Bubble className={styles.customBubble} skin={<SimpleBubbleSkin />} >
        this bubble is right aligned;
      </Bubble>
    </div>
  ))

  .add('content-light', () => (
    <div className={styles.container}>
      <Bubble skin={<SimpleBubbleSkin/>} >
        tiny
      </Bubble>
    </div>
  ))
  .add('isHidden', () => (
    <div className={styles.container}>
      There should be no bubble shown!
      <Bubble isHidden skin={<SimpleBubbleSkin/>} >
        should not be visible!
      </Bubble>
    </div>
  ))
  .add('isFloating', () => (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        <Bubble isFloating skin={<SimpleBubbleSkin/>} >
          floating above scroll content
        </Bubble>
      </div>
      <p>
        Here is some text that should break<br/>
        and trigger scroll bars<br/>
      </p>
    </div>
  ));
