import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../source/components';
import { ButtonSkin } from '../source/skins/simple';

test('Button renders correctly', () => {
  const component = renderer.create(
    <Button skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderer.create(
    <Button label="send" skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderer.create(
    <Button disabled skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
