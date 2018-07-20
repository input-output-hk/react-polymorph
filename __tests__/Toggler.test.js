import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components/Checkbox';
import { TogglerSkin } from '../source/skins/simple/TogglerSkin';
import { IDENTIFIERS } from '../source/themes/API';
import { renderInSimpleTheme } from './helpers/theming';

test('Toggler renders correctly', () => {
  const component = renderInSimpleTheme(
    <Checkbox
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Toggler renders within text', () => {
  const component = renderInSimpleTheme(
    <div>
      <span>Fees&nbsp;</span>
      <Checkbox
        labelLeft="Included"
        labelRight="Excluded"
        themeId={IDENTIFIERS.TOGGLER}
        skin={TogglerSkin}
      />
      <span>&nbsp;from the amount</span>
    </div>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Toggler is disabled', () => {
  const component = renderInSimpleTheme(
    <Checkbox
      disabled
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Toggler is checked', () => {
  const component = renderInSimpleTheme(
    <Checkbox
      checked
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
