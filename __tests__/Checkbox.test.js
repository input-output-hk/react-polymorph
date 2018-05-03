import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { CheckboxSkin } from '../source/skins/simple';

test('Checkbox renders to the DOM', () => {
  const component = renderer.create(
    <Checkbox skin={CheckboxSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderer.create(
    <Checkbox label="check here" skin={CheckboxSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderer.create(
    <Checkbox disabled skin={CheckboxSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderer.create(
    <Checkbox checked skin={CheckboxSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// TODO: need to simulate onChange event for Checkbox tests
