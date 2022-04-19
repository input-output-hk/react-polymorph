import React from 'react';
import { Checkbox } from '../source/components/Checkbox';
import { mountInSimpleTheme } from './helpers/theming';

describe('Checkbox behavior', () => {
  test('onChange should fire exactly once', () => {
    const onChange = jest.fn();
    const component = mountInSimpleTheme(<Checkbox onChange={onChange} />);
    component.simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ type: 'click' })
    );
  });
  test('onChange should not fire when disabled', () => {
    const onChange = jest.fn();
    const component = mountInSimpleTheme(
      <Checkbox onChange={onChange} disabled />
    );
    const checkboxElement = component.find('input');
    expect(checkboxElement.prop('disabled')).toBe(true);
    component.simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
