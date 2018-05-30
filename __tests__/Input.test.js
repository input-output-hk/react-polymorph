import React from 'react';
import renderer from 'react-test-renderer';

import { Input } from '../source/components';
import InputSkin from './helpers/InputSkin'; // use helper InputSkin
import { CONTEXT } from './helpers/context';

test('Input renders correctly', () => {
  const component = renderer.create(
    <Input context={CONTEXT} skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  const component = renderer.create(
    <Input placeholder="0.0000" context={CONTEXT} skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with a value', () => {
  const component = renderer.create(
    <Input value="there is value" context={CONTEXT} skin={InputSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input is readOnly', () => {
  const component = renderer.create(
    <Input
      readOnly
      context={CONTEXT}
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
