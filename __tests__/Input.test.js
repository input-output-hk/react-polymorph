import React from 'react';
import renderer from 'react-test-renderer';

import { Input } from '../source/components';
import { InputSkin } from '../source/skins/simple';

test('Input renders correctly', () => {
  const component = renderer.create(
    <Input skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  const component = renderer.create(
    <Input placeholder="0.0000" skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with a value', () => {
  const component = renderer.create(
    <Input value="there is value" skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input is readOnly', () => {
  const component = renderer.create(
    <Input
      readOnly
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
