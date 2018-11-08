import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { InputSkin } from '../source/skins/simple/InputSkin';
import { mountInSimpleTheme } from './helpers/theming';

describe('NumericInput onChange simulations', () => {
  test('onChange updates state with valid amount', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput skin={InputSkin} />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // valid input value
    input.simulate('change', { target: { value: '19.00' } });
    expect(component.state.oldValue).toBe('19.00');
  });

  test('onChange creates error via invalid amount: value > maxValue', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        maxValue={1000}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // invalid input value: value > maxValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '1001.00' } });
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');
  });

  test('onChange creates error via invalid amount: value < minValue', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        minValue={500}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // invalid input value: value < minValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '499.99' } });
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');
  });

  test('onChange is passed invalid amount, maxBeforeDot is enforced correctly', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        maxBeforeDot={3}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // input value is valid: value has 3 integer places
    input.simulate('change', { target: { value: '432.99' } });
    expect(component.state.oldValue).toBe('432.99');

    // input value is invalid: value has 4 integer places
    // 6 should be dropped from the 1's place
    input.simulate('change', { target: { value: '9876.99' } });
    expect(component.state.oldValue).toBe('987.99');
  });

  test('onChange is passed invalid amount, maxAfterDot is enforced correctly', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        maxAfterDot={4}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // simulate onChange with 4 decimal places (valid)
    input.simulate('change', { target: { value: '65.7821' } });
    expect(component.state.oldValue).toBe('65.7821');

    // simulate onChange with 5 decimal places (invalid)
    input.simulate('change', { target: { value: '85.98543' } });
    // 3 should be dropped from the 5th decimal place
    expect(component.state.oldValue).toBe('85.9854');
  });

  test('integers only - onChange is passed invalid amount, maxAfterDot is enforced correctly', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        maxAfterDot={0}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // simulate onChange with only an integer (valid)
    input.simulate('change', { target: { value: '1234' } });
    expect(component.state.oldValue).toBe('1234');

    // simulate onChange with floating point number (invalid)
    input.simulate('change', { target: { value: '5678.985' } });
    // should drop decimal & all numbers after decimal: '.985'
    expect(component.state.oldValue).toBe('5678');
  });

  test('onChange simulates amount exceeding maxValue, enforceMax is enforced', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        enforceMax
        maxValue={24999}
        maxAfterDot={2}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // valid input value: there should be no error in state or className
    input.simulate('change', { target: { value: '24500.99' } });
    expect(component.state.oldValue).toBe('24500.99');
    expect(component.state.error).toBe('');
    expect(input.instance().className).toBe('input');

    // invalid input value: value exceeds maxValue
    // integers should be adjusted to maxValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '25000.00' } });
    expect(component.state.oldValue).toBe('24999.00');
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');

    // invalid input value: decimal value exceeds maxValue
    // decimals should be adjusted to maxValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '24999.99' } });
    expect(component.state.oldValue).toBe('24999.00');
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');

    // valid input value: should reset state and className
    input.simulate('change', { target: { value: '50.00' } });
    expect(component.state.error).toBe('');
    expect(input.instance().className).toBe('input');
  });

  test('onChange simulates amount less than minValue, enforceMin is enforced', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput
        enforceMin
        minValue={99.99}
        maxAfterDot={2}
        skin={InputSkin}
      />
    );

    const component = wrapper.find('NumericInput').instance();
    const input = wrapper.find('input');

    // simulate onChange with valid amount
    // should be no error in state or className
    input.simulate('change', { target: { value: '100.00' } });
    expect(component.state.oldValue).toBe('100.00');
    expect(component.state.error).toBe('');

    // input value is invalid: value < minValue
    // integers should be adjusted to minValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '85.99' } });
    expect(component.state.oldValue).toBe('99.99');
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');

    // input value is invalid: decimal value is less than minValue
    // decimals should be adjusted to minValue
    // state and className should reflect error
    input.simulate('change', { target: { value: '99.98' } });
    expect(component.state.oldValue).toBe('99.99');
    expect(component.state.error).toBeTruthy();
    expect(input.instance().className).toBe('input errored');

    // valid input value: should reset error in state and className
    input.simulate('change', { target: { value: '150.00' } });
    expect(component.state.error).toBe('');
    expect(input.instance().className).toBe('input');
  });
});
