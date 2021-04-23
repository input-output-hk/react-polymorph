import BigNumber from 'bignumber.js';
import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { mountInSimpleTheme } from './helpers/theming';

describe('NumericInput onChange simulations', () => {
  const mountNumericInputWithProps = (props) => {
    const onChangeMock = jest.fn();
    const wrapper = mountInSimpleTheme(
      <NumericInput {...props} onChange={onChangeMock} />
    );
    const input = wrapper.find('input');
    return {
      input,
      onChangeMock,
      wrapper,
    };
  };

  describe('onChange behavior', () => {
    test('valid input triggers onChange listener', () => {
      const { input, onChangeMock } = mountNumericInputWithProps();
      input.simulate('change', { nativeEvent: { target: { value: '19.00' } } });
      const onChangeValue = onChangeMock.mock.calls[0][0];
      expect(onChangeValue).toEqual('19');
    });
    test('invalid input does not trigger onChange listener', () => {
      const { input, onChangeMock } = mountNumericInputWithProps();
      input.simulate('change', { nativeEvent: { target: { value: 'A.00' } } });
      expect(onChangeMock.mock.calls.length).toBe(0);
    });
  });

  describe('configurable number formats', () => {
    test('handles commas as group separators by default', () => {
      const { input, onChangeMock } = mountNumericInputWithProps();
      input.simulate('change', {
        nativeEvent: { target: { value: '9,999,999.00' } },
      });
      const onChangeValue = onChangeMock.mock.calls[0][0];
      expect(onChangeValue).toBe('9999999');
    });
    test('can be configured to handle dots as thousand separators', () => {
      const { input, onChangeMock } = mountNumericInputWithProps({
        bigNumberFormat: {
          groupSeparator: '.',
          decimalSeparator: ',',
        },
      });
      input.simulate('change', {
        nativeEvent: { target: { value: '9.999.999,00' } },
      });
      expect(onChangeMock.mock.calls[0][0]).toBe('9999999');
    });
    test('can be configured to handle spaces as thousand separators', () => {
      const { input, onChangeMock } = mountNumericInputWithProps({
        bigNumberFormat: {
          groupSeparator: ' ',
          decimalSeparator: '.',
        },
      });
      input.simulate('change', {
        nativeEvent: { target: { value: '9 999 999.00' } },
      });
      expect(onChangeMock.mock.calls[0][0]).toBe('9999999');
    });
  });
});
