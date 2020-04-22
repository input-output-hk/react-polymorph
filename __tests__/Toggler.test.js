import React from 'react';

import { Checkbox } from '../source/components/Checkbox';
import { TogglerSkin } from '../source/skins/simple/TogglerSkin';
import { IDENTIFIERS } from '../source/components';
import { renderInSimpleTheme } from './helpers/theming';

test('Toggler renders correctly', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  )).toMatchSnapshot();
});

test('Toggler renders within text', () => {
  expect(renderInSimpleTheme(
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
  )).toMatchSnapshot();
});

test('Toggler is disabled', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      disabled
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  )).toMatchSnapshot();
});

test('Toggler is checked', () => {
  expect(renderInSimpleTheme(
    <Checkbox
      checked
      labelLeft="Included"
      labelRight="Excluded"
      themeId={IDENTIFIERS.TOGGLER}
      skin={TogglerSkin}
    />
  )).toMatchSnapshot();
});
