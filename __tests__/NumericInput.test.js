import React from 'react';
import renderer from 'react-test-renderer';

import { NumericInput } from '../source/components';
import { InputSkin } from '../source/skins/simple';
import InputTheme from '../source/themes/simple/SimpleInput.scss';
import { createNodeMock } from './__mocks__/createNodeMock';

const SimpleTheme = { input: InputTheme };

test('NumericInput renders to the DOM', () => {
  const component = renderer.create(
    <NumericInput theme={SimpleTheme} skin={InputSkin} />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with placeholder', () => {
  const component = renderer.create(
    <NumericInput placeholder="0.0000" theme={SimpleTheme} skin={InputSkin} />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with a value', () => {
  const component = renderer.create(
    <NumericInput value="there is value here" theme={SimpleTheme} skin={InputSkin} />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


// TODO: need to simulate onChange event for the following components
test('minValue throws an error', () => {
  const component = renderer.create(
    <NumericInput
      minValue={10}
      value="8"
      theme={SimpleTheme}
      skin={InputSkin}
    />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxValue throws an error', () => {
  const component = renderer.create(
    <NumericInput
      value="there is value here"
      maxValue={50}
      theme={SimpleTheme}
      skin={InputSkin}
    />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxBeforeDot renders amount correctly', () => {
  const component = renderer.create(
    <NumericInput
      value="333.00"
      maxBeforeDot={2}
      theme={SimpleTheme}
      skin={InputSkin}
    />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxAfterDot renders amount correctly', () => {
  const component = renderer.create(
    <NumericInput
      value="10.4891"
      maxAfterDot={3}
      theme={SimpleTheme}
      skin={InputSkin}
    />,
    { createNodeMock }
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
