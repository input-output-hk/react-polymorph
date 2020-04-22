import React from 'react';

import { Checkbox } from '../source/components/Checkbox';
import { SwitchSkin } from '../source/skins/simple/SwitchSkin';
import { IDENTIFIERS } from '../source/components';
import { renderInSimpleTheme } from './helpers/theming';

test('Switch renders correctly', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      skin={SwitchSkin}
    />
  )).toMatchSnapshot();
});

test('Switch renders with label', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      label="click here"
      skin={SwitchSkin}
    />
  )).toMatchSnapshot();
});

test('Switch is disabled', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      disabled
      skin={SwitchSkin}
    />
  )).toMatchSnapshot();
});

test('Switch is disabled and renders a label', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      disabled
      label="click here"
      skin={SwitchSkin}
    />
  )).toMatchSnapshot();
});

test('Switch is checked', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      themeId={IDENTIFIERS.SWITCH}
      checked
      skin={SwitchSkin}
    />
  )).toMatchSnapshot();
});
