import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import NumericInput from '../source/components/NumericInput';
import SimpleInputSkin from '../source/skins/simple/InputSkin';

storiesOf('NumericInput', module)

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

  .add('Send amount - plain', () => <NumericInput skin={<SimpleInputSkin />} /> )

  .add('Send amount - label', () => (
    <NumericInput
      label="Amount"
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - placeholder', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - focus / blur', () => {
    let input;
    return (
      <div>
        <NumericInput
          ref={(ref) => input = ref}
          label="Amount"
          onFocus={action('onFocus')}
          onBlur={action('onBlur')}
          skin={<SimpleInputSkin />}
        />
        <button onClick={() => input.focus()}>focus</button> | <button onClick={() => input.blur()}>blur</button>
      </div>
    );
  })

  .add('Send amount - error', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      error="Please enter a valid amount"
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - beforeDot(3) and afterDot(4)', () => (
    <NumericInput
      label="Amount"
      placeholder="0.0000"
      maxBeforeDot={3}
      maxAfterDot={4}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - maxValue(30000)', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      maxValue={30000}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - maxValue(30000) and minValue(1)', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      maxValue={30000}
      minValue={1}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleInputSkin />}
    />
  ))

  .add('Send amount - onChange', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      maxBeforeDot={12}
      maxAfterDot={6}
      maxValue={45000000000}
      minValue={0.000001}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleInputSkin />}
    />
  ))
