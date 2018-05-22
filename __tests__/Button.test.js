import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../source/components';
import { ButtonSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('Button renders correctly', () => {
  const component = renderer.create(
    <Button context={CONTEXT} skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderer.create(
    <Button label="send" context={CONTEXT} skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderer.create(
    <Button disabled context={CONTEXT} skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
