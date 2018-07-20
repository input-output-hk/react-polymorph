import React from 'react';

import { Input } from '../source/components/Input';
import { InputSkin } from '../source/skins/simple/InputSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('Input renders correctly', () => {
  const component = renderInSimpleTheme(
    <Input skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <Input placeholder="0.0000" skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with a value', () => {
  const component = renderInSimpleTheme(
    <Input value="there is value" skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input is readOnly', () => {
  const component = renderInSimpleTheme(
    <Input
      readOnly
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
