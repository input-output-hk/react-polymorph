import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { NumericInput } from '../source/components';
import { InputSkin } from '../source/skins/simple';
import { createNodeMock } from './__mocks__/createNodeMock';

test('NumericInput renders to the DOM', () => {
  const component = renderer.create(
    <NumericInput skin={InputSkin} />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with placeholder', () => {
  const component = renderer.create(
    <NumericInput placeholder="0.0000" skin={InputSkin} />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with a value', () => {
  const component = renderer.create(
    <NumericInput value={"there is value here"} skin={InputSkin} />,
    {createNodeMock}
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


// TODO: need to simulate onChange event for the following components
test('minValue throws an error', () => {
  const component = renderer.create(
    <NumericInput
      minValue={10}
      value={"8"}
      skin={InputSkin}
    />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxValue throws an error', () => {
  const component = renderer.create(
    <NumericInput
      maxValue={50}
      value={"60"}
      skin={InputSkin}
    />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxBeforeDot renders amount correctly', () => {
  const component = renderer.create(
    <NumericInput
      value={"333.00"}
      maxBeforeDot={2}
      skin={InputSkin}
    />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('maxAfterDot renders amount correctly', () => {
  const component = renderer.create(
    <NumericInput
      value={"10.4891"}
      maxAfterDot={3}
      skin={InputSkin}
    />,
    {createNodeMock}
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
