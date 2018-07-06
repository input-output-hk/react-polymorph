import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components/Checkbox';
import { CheckboxSkin } from '../source/skins/simple/CheckboxSkin';

test('Checkbox renders correctly', () => {
  const component = renderer.create(
    <Checkbox skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderer.create(
    <Checkbox label="check here" skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderer.create(
    <Checkbox disabled skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderer.create(
    <Checkbox checked skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
