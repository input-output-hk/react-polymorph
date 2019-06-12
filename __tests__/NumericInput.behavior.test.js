import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { mountInSimpleTheme } from './helpers/theming';

describe('NumericInput onChange simulations', () => {

  test('valid input triggers onChange listener', () => {
    let changedValue;
    const wrapper = mountInSimpleTheme(<NumericInput onChange={v => changedValue = v} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '19.00' } });
    expect(changedValue).toBe(19.00);
  });

  test('handles en-US localized input values', () => {
    let changedValue;
    const wrapper = mountInSimpleTheme(<NumericInput onChange={v => changedValue = v} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '9,999,999.00' } });
    expect(changedValue).toBe(9999999.00);
  });

  test('invalid input does not trigger onChange listener', () => {
    let onChangeHasBeenCalled = false;
    const wrapper = mountInSimpleTheme(<NumericInput onChange={() => onChangeHasBeenCalled = true} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'A.00' } });
    expect(onChangeHasBeenCalled).toBe(false);
  });

  test('enforces given minimumFractionDigits', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput numberLocaleOptions={{ minimumFractionDigits: 6 }} value={0} />
    );
    const input = wrapper.find('input');
    expect(input.getDOMNode().value).toBe('0.000000');
  });

  test('enforces given maximumFractionDigits', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput numberLocaleOptions={{ maximumFractionDigits: 2 }} value={0.123} />
    );
    const input = wrapper.find('input');
    expect(input.getDOMNode().value).toBe('0.12');
  });

  test('dynamically adjusts minimumFractionDigits for ux', () => {
    const wrapper = mountInSimpleTheme(
      <NumericInput numberLocaleOptions={{ minimumFractionDigits: 0 }} value={0} />
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '0.' } });
    expect(input.getDOMNode().value).toBe('0.0');
  });

});
