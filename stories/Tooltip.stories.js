import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Tooltip from '../source/components/Tooltip';
import SimpleTooltipSkin from '../source/skins/simple/TooltipSkin';
import styles from './Tooltip.stories.scss';

storiesOf('Tooltip', module)

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
      <Tooltip
        skin={<SimpleTooltipSkin />}
        tip='plain tooltip, nothing special about me'
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('html', () => (
    <div className={styles.container}>
      <Tooltip
        skin={<SimpleTooltipSkin />}
        tip={(
          <div>I can use <span className={styles.htmlTip}>HTML</span></div>
        )}
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isAligningRight', () => (
    <div className={styles.container}>
      <Tooltip
        isAligningRight
        skin={<SimpleTooltipSkin />}
        tip='I am aligning right'
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isBounded', () => (
    <div className={styles.container}>
      <Tooltip
        isBounded
        skin={<SimpleTooltipSkin />}
        tip='Help, I am stuck in this small box'
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('with custom class', () => (
    <div className={styles.container}>
      <Tooltip
        className={styles.customTooltip}
        skin={<SimpleTooltipSkin />}
        tip='How did I get all the way over here?'
      >
        hover over me
      </Tooltip>
    </div>
  ))

  .add('isOpeningUpward={false}', () => (
    <div className={styles.container}>
      <Tooltip
        isOpeningUpward={false}
        skin={<SimpleTooltipSkin />}
        tip='I come from a land down under'
      >
        hover over me
      </Tooltip>
    </div>
  ));
