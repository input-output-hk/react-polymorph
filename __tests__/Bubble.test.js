import React from 'react';
import renderer from 'react-test-renderer';

import { Bubble } from '../source/components';
import { BubbleSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('Bubble renders correctly', () => {
  const component = renderer.create(
    <Bubble context={CONTEXT} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward={true}', () => {
  const component = renderer.create(
    <Bubble isOpeningUpward context={CONTEXT} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  const component = renderer.create(
    <Bubble isTransparent={false} context={CONTEXT} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isHidden={true}', () => {
  const component = renderer.create(
    <Bubble isHidden context={CONTEXT} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isFloating={true}', () => {
  const component = renderer.create(
    <Bubble isFloating context={CONTEXT} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
