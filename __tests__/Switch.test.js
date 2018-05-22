import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { SwitchSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('Switch renders correctly', () => {
  const component = renderer.create(
    <Checkbox
      context={CONTEXT}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch renders with label', () => {
  const component = renderer.create(
    <Checkbox
      label="click here"
      context={CONTEXT}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is disabled', () => {
  const component = renderer.create(
    <Checkbox
      disabled
      context={CONTEXT}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is disabled and renders a label', () => {
  const component = renderer.create(
    <Checkbox
      disabled
      label="click here"
      context={CONTEXT}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is checked', () => {
  const component = renderer.create(
    <Checkbox
      checked
      context={CONTEXT}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
