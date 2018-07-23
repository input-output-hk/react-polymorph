import React from 'react';

import { Button } from '../source/components/Button';
import { ButtonSkin } from '../source/skins/simple/ButtonSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('Button renders correctly', () => {
  const component = renderInSimpleTheme(
    <Button skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderInSimpleTheme(
    <Button label="send" skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderInSimpleTheme(
    <Button disabled skin={ButtonSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
