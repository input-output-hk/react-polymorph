import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { SwitchSkin } from '../source/skins/simple';

test('Switch renders correctly', () => {
  const component = renderer.create(
    <Checkbox
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch renders with label', () => {
  const component = renderer.create(
    <Checkbox
      label="click here"
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is disabled', () => {
  const component = renderer.create(
    <Checkbox
      disabled
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch renders with a label and disabled', () => {
  const component = renderer.create(
    <Checkbox
      disabled
      label="click here"
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is checked', () => {
  const component = renderer.create(
    <Checkbox
      checked
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
