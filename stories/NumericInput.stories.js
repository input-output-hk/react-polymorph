import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import NumericInput from '../source/components/NumericInput';
import SimpleNumericInputSkin from '../source/skins/simple/NumericInputSkin';

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

  .add('Send amount - plain', () => <NumericInput skin={<SimpleNumericInputSkin />} /> )

  .add('Send amount - label', () => (
    <NumericInput
      label="Amount"
      skin={<SimpleNumericInputSkin />}
    />
  ))

  .add('Send amount - placeholder', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      skin={<SimpleNumericInputSkin />}
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
          skin={<SimpleNumericInputSkin />}
        />
        <button onClick={() => input.focus()}>focus</button> | <button onClick={() => input.blur()}>blur</button>
      </div>
    );
  })

  .add('Send amount - with right label', () => (
    <NumericInput
      label="Amount"
      placeholder="0.000000"
      rightLabel="ADA"
      skin={<SimpleNumericInputSkin />}
    />
  ))

  .add('Send amount - error', () => (
    <NumericInput
      label="Amount"
      rightLabel="ADA"
      placeholder="0.000000"
      error="Please enter a valid amount"
      skin={<SimpleNumericInputSkin />}
    />
  ))

  .add('Send amount - beforeDot(3) and afterDot(4)', () => (
    <NumericInput
      label="Amount"
      rightLabel="ADA"
      placeholder="0.0000"
      maxBeforeDot={3}
      maxAfterDot={4}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleNumericInputSkin />}
    />
  ))

  .add('Send amount - maxValue(30000)', () => (
    <NumericInput
      label="Amount"
      rightLabel="ADA"
      placeholder="0.000000"
      maxValue={300000000}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleNumericInputSkin />}
    />
  ))

  .add('Send amount - onChange', () => (
    <NumericInput
      label="Amount"
      rightLabel="ADA"
      placeholder="0.000000"
      maxBeforeDot={15}
      maxAfterDot={6}
      maxValue={45000000000000000}
      onChange={mobxAction((value) => { state.value = value; })}
      skin={<SimpleNumericInputSkin />}
    />
  ))