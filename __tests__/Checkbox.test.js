import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components';
import { CheckboxSkin } from '../source/skins/simple';
import CheckboxTheme from '../source/themes/simple/SimpleCheckbox.scss';

const SimpleTheme = { checkbox: CheckboxTheme };

test('Checkbox renders to the DOM', () => {
  const component = renderer.create(
    <Checkbox theme={SimpleTheme} skin={CheckboxSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderer.create(
    <Checkbox label="check here" theme={SimpleTheme} skin={CheckboxSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderer.create(
    <Checkbox disabled theme={SimpleTheme} skin={CheckboxSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderer.create(
    <Checkbox checked theme={SimpleTheme} skin={CheckboxSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
