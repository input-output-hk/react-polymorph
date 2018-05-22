import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { CheckboxSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('Checkbox renders correctly', () => {
  const component = renderer.create(
    <Checkbox context={CONTEXT} skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderer.create(
    <Checkbox label="check here" context={CONTEXT} skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderer.create(
    <Checkbox disabled context={CONTEXT} skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderer.create(
    <Checkbox checked context={CONTEXT} skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
