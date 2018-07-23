import React from 'react';
import renderer from 'react-test-renderer';

import { Radio } from '../source/components/Radio';
import { RadioSkin } from '../source/skins/simple/RadioSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('Radio renders correctly', () => {
  const component = renderInSimpleTheme(
    <Radio skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  const component = renderInSimpleTheme(
    <Radio label="click here" skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is disabled', () => {
  const component = renderInSimpleTheme(
    <Radio disabled skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is selected', () => {
  const component = renderInSimpleTheme(
    <Radio selected skin={RadioSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
