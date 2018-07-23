import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components/Checkbox';
import { SwitchSkin } from '../source/skins/simple/SwitchSkin';
import { IDENTIFIERS } from '../source/themes/API';
import { renderInSimpleTheme } from './helpers/theming';

test('Switch renders correctly', () => {
  const component = renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Switch renders with label', () => {
  const component = renderInSimpleTheme(
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
  const component = renderInSimpleTheme(
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
  const component = renderInSimpleTheme(
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
  const component = renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      checked
      skin={SwitchSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
