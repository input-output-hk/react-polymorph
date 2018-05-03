import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../source/components';
import { ButtonSkin } from '../source/skins/simple';

test('Button renders to the DOM', () => {
  const component = renderer.create(
    <Button skin={ButtonSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderer.create(
    <Button label="send" skin={ButtonSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderer.create(
    <Button disabled skin={ButtonSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// TODO: need to simulate onClick event for Button tests
