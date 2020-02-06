import React from 'react';

import { Select } from '../source/components/Select';
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

const WALLETS = [
  { value: '100,100 ADA', label: 'Main wallet' },
  { value: '10,100.2 ADA', label: 'Spending money' },
  { value: '500,1000 ADA', label: 'Savings' },
];

test('Select renders correctly', () => {
  expect(renderInSimpleTheme(
    <Select options={COUNTRIES} />
  )).toMatchSnapshot();
});

test('Select renders with placeholder', () => {
  expect(renderInSimpleTheme(
    <Select
      placeholder="Select your country …"
      options={COUNTRIES}
    />
  )).toMatchSnapshot();
});

test('Select renders with an error', () => {
  expect(renderInSimpleTheme(
    <Select
      error="Please select a different option"
      options={COUNTRIES}
    />
  )).toMatchSnapshot();
});

test('Select renders with disabled options', () => {
  expect(renderInSimpleTheme(
    <Select options={COUNTRIES_DISABLED_OPTIONS} />
  )).toMatchSnapshot();
});

test('Select isOpeningUpward={true}', () => {
  expect(renderInSimpleTheme(
    <Select
      isOpeningUpward
      options={COUNTRIES}
    />
  )).toMatchSnapshot();
});

test('Select isOpen={true}', () => {
  expect(renderInSimpleTheme(
    <Select
      isOpen
      options={COUNTRIES}
    />
  )).toMatchSnapshot();
});

test('Select uses render prop - optionRenderer', () => {
  expect(renderInSimpleTheme(
    <Select
      options={COUNTRIES}
      optionRenderer={option => (
        <div>
          <span>German: {option.label}</span>
          <span>English: {option.value}</span>
        </div>
      )}
    />
  )).toMatchSnapshot();
});

test('Select uses render prop - valueRenderer', () => {
  expect(renderInSimpleTheme(
    <Select
      options={WALLETS}
      optionRenderer={option => (
        <div>
          <div>{option.label}</div>
          <div>{option.value}</div>
        </div>
      )}
      selectionRenderer={option => (
        <div>
          <div>{option.label}</div>
          <div>{option.value}</div>
        </div>
      )}
    />
  )).toMatchSnapshot();
});
