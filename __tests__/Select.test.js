import React from 'react';
import renderer from 'react-test-renderer';

import { Select } from '../source/components';
import { SelectSkin } from '../source/skins/simple';

const COUNTRIES = [
  { label: 'Frankreich', value: 'France' },
  { label: 'Spanien', value: 'Spain' },
  { label: 'Kroatien', value: 'Croatia' },
  { label: 'Vereinigten Staaten', value: 'United States' },
  { label: 'Österreich', value: 'Austria' }
];

const COUNTRIES_WITH_DISABLED_OPTIONS = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain', isDisabled: true },
  { value: 'TH-th', label: 'Thailand', isDisabled: true },
  { value: 'EN-en', label: 'USA' }
];

test('Select renders correctly', () => {
  const component = renderer.create(
    <Select
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with placeholder', () => {
  const component = renderer.create(
    <Select
      placeholder="Select your country …"
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with an error', () => {
  const component = renderer.create(
    <Select
      error="Please select a different option"
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders with disabled options', () => {
  const component = renderer.create(
    <Select
      options={COUNTRIES_WITH_DISABLED_OPTIONS}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select isOpeningUpward', () => {
  const component = renderer.create(
    <Select
      isOpeningUpward
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select isOpen', () => {
  const component = renderer.create(
    <Select
      isOpen
      options={COUNTRIES}
      skin={SelectSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Select renders via optionRenderer', () => {
  const component = renderer.create(
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

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
