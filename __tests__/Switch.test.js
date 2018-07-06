import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components/Checkbox';
import { SwitchSkin } from '../source/skins/simple/SwitchSkin';
import { IDENTIFIERS } from '../source/themes/API';

test('Switch renders correctly', () => {
  const component = renderer.create(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch renders with label', () => {
  const component = renderer.create(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      label="click here"
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is disabled', () => {
  const component = renderer.create(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      disabled
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is disabled and renders a label', () => {
  const component = renderer.create(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      disabled
      label="click here"
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch is checked', () => {
  const component = renderer.create(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      checked
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
