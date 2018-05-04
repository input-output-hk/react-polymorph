import React from 'react';
import renderer from 'react-test-renderer';

import { Bubble } from '../source/components';
import { BubbleSkin } from '../source/skins/simple';

test('Bubble renders correctly', () => {
  const component = renderer.create(
    <Bubble skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward', () => {
  const component = renderer.create(
    <Bubble isOpeningUpward skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  const component = renderer.create(
    <Bubble isTransparent={false} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isHidden', () => {
  const component = renderer.create(
    <Bubble isHidden skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isFloating', () => {
  const component = renderer.create(
    <Bubble isFloating skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
