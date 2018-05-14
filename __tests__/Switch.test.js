import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { SwitchSkin } from '../source/skins/simple';
import SwitchTheme from '../source/themes/simple/SimpleSwitch.scss';

const SimpleTheme = { switch: SwitchTheme };

test('Switch renders correctly', () => {
  const component = renderer.create(
    <Checkbox
      theme={SimpleTheme}
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
      theme={SimpleTheme}
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
      theme={SimpleTheme}
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
      theme={SimpleTheme}
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
      theme={SimpleTheme}
      skin={SwitchSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
