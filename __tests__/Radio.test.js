import React from 'react';
import renderer from 'react-test-renderer';

import { Radio } from '../source/components';
import { RadioSkin } from '../source/skins/simple';

test('Radio renders correctly', () => {
  const component = renderer.create(
    <Radio skin={RadioSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  const component = renderer.create(
    <Radio label="click here" skin={RadioSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is disabled', () => {
  const component = renderer.create(
    <Radio disabled skin={RadioSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is selected', () => {
  const component = renderer.create(
    <Radio selected skin={RadioSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
