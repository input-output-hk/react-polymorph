import React from 'react';

import { Checkbox } from '../source/components/Checkbox';
import { CheckboxSkin } from '../source/skins/simple/CheckboxSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('Checkbox renders correctly', () => {
  const component = renderInSimpleTheme(
    <Checkbox skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderInSimpleTheme(
    <Checkbox label="check here" skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderInSimpleTheme(
    <Checkbox disabled skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderInSimpleTheme(
    <Checkbox checked skin={CheckboxSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
