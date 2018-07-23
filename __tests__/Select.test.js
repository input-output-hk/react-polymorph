import React from 'react';
import renderer from 'react-test-renderer';

import { Select } from '../source/components/Select';
import { SelectSkin } from '../source/skins/simple/SelectSkin';
import { renderInSimpleTheme } from './helpers/theming';

const COUNTRIES = [
  { label: 'Frankreich', value: 'France' },
  { label: 'Spanien', value: 'Spain' },
  { label: 'Kroatien', value: 'Croatia' },
  { label: 'Vereinigten Staaten', value: 'United States' },
  { label: 'Österreich', value: 'Austria' }
];

const COUNTRIES_DISABLED_OPTIONS = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain', isDisabled: true },
  { value: 'TH-th', label: 'Thailand', isDisabled: true },
  { value: 'EN-en', label: 'USA' }
];

test('Select renders correctly', () => {
  const component = renderInSimpleTheme(
    <Select
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <Select
      placeholder="Select your country …"
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with an error', () => {
  const component = renderInSimpleTheme(
    <Select
      error="Please select a different option"
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with disabled options', () => {
  const component = renderInSimpleTheme(
    <Select
      options={COUNTRIES_DISABLED_OPTIONS}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select isOpeningUpward={true}', () => {
  const component = renderInSimpleTheme(
    <Select
      isOpeningUpward
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select isOpen={true}', () => {
  const component = renderInSimpleTheme(
    <Select
      isOpen
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select uses render prop - optionRenderer', () => {
  const component = renderInSimpleTheme(
    <Select
      options={COUNTRIES}
      skin={SelectSkin}
      optionRenderer={option => (
        <div>
          <span>German: {option.label}</span>
          <span>English: {option.value}</span>
        </div>
      )}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
