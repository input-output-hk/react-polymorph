import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../source/components';
import { ButtonSkin } from '../source/skins/simple';
import ButtonTheme from '../source/themes/simple/SimpleButton.scss';

const SimpleTheme = { button: ButtonTheme };

test('Button renders to the DOM', () => {
  const component = renderer.create(
    <Button theme={SimpleTheme} skin={ButtonSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderer.create(
    <Button label="send" theme={SimpleTheme} skin={ButtonSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderer.create(
    <Button disabled theme={SimpleTheme} skin={ButtonSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
