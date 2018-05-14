import React from 'react';
import renderer from 'react-test-renderer';

import { Radio } from '../source/components';
import { RadioSkin } from '../source/skins/simple';
import RadioTheme from '../source/themes/simple/SimpleRadio.scss';

const SimpleTheme = { radio: RadioTheme };

test('Radio renders correctly', () => {
  const component = renderer.create(
    <Radio theme={SimpleTheme} skin={RadioSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  const component = renderer.create(
    <Radio label="click here" theme={SimpleTheme} skin={RadioSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is disabled', () => {
  const component = renderer.create(
    <Radio disabled theme={SimpleTheme} skin={RadioSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is selected', () => {
  const component = renderer.create(
    <Radio selected theme={SimpleTheme} skin={RadioSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
