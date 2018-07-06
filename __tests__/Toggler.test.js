import React from 'react';
import renderer from 'react-test-renderer';

import { Checkbox } from '../source/components/Checkbox';
import { TogglerSkin } from '../source/skins/simple/TogglerSkin';
import { IDENTIFIERS } from '../source/themes/API';

test('Toggler renders correctly', () => {
  const component = renderer.create(
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
  const component = renderer.create(
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
  const component = renderer.create(
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
  const component = renderer.create(
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
