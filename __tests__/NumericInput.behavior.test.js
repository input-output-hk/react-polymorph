import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { mountInSimpleTheme } from './helpers/theming';

describe('NumericInput onChange simulations', () => {

  const mountNumericInputWithProps = (props) => {
    const onChangeMock = jest.fn();
    const wrapper = mountInSimpleTheme(<NumericInput {...props} onChange={onChangeMock} />);
    const input = wrapper.find('input');
    return {
      input,
      onChangeMock,
      wrapper,
    };
  };

  test('valid input triggers onChange listener', () => {
    const { input, onChangeMock } = mountNumericInputWithProps();
    input.simulate('change', { nativeEvent: { target: { value: '19.00' } } });
    expect(onChangeMock.mock.calls[0][0]).toBe(19.00);
  });

  test('handles comma as group separator by default', () => {
    const { input, onChangeMock } = mountNumericInputWithProps();
    input.simulate('change', { nativeEvent: { target: { value: '9,999,999.00' } } });
    expect(onChangeMock.mock.calls[0][0]).toBe(9999999.00);
  });

  test('invalid input does not trigger onChange listener', () => {
    const { input, onChangeMock } = mountNumericInputWithProps();
    input.simulate('change', { nativeEvent: { target: { value: 'A.00' } } });
    expect(onChangeMock.mock.calls.length).toBe(0);
  });

  test('enforces given minimumFractionDigits', () => {
    const { input } = mountNumericInputWithProps({
      numberLocaleOptions: { minimumFractionDigits: 6 },
      value: 0,
    });
    expect(input.getDOMNode().value).toBe('0.000000');
  });

  test('enforces given maximumFractionDigits', () => {
    const { input } = mountNumericInputWithProps({
      numberLocaleOptions: { maximumFractionDigits: 2 },
      value: 0.123,
    });
    expect(input.getDOMNode().value).toBe('0.12');
  });

});
