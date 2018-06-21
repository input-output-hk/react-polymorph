import React from 'react';
import renderer from 'react-test-renderer';

import { Radio } from '../source/components';
import { RadioSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('Radio renders correctly', () => {
  const component = renderer.create(
    <Radio context={CONTEXT} skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  const component = renderer.create(
    <Radio label="click here" context={CONTEXT} skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is disabled', () => {
  const component = renderer.create(
    <Radio disabled context={CONTEXT} skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is selected', () => {
  const component = renderer.create(
    <Radio selected context={CONTEXT} skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
