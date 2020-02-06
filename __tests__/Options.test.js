import React from 'react';

import { Options } from '../source/components/Options';
import { renderInSimpleTheme } from './helpers/theming';

const MNEMONIC_WORDS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
];

const COUNTRIES_OPTIONS = [
  { german: 'Frankreich', english: 'France' },
  { german: 'Spanien', english: 'Spain' },
  { german: 'Kroatien', english: 'Croatia' },
  { german: 'Vereinigten Staaten', english: 'United States' },
  { german: 'Österreich', english: 'Austria' }
];

test('Options renders correctly', () => {
  expect(renderInSimpleTheme(
    <Options options={MNEMONIC_WORDS} />
  )).toMatchSnapshot();
});

test('Options uses render prop - render', () => {
  expect(renderInSimpleTheme(
    <Options
      options={MNEMONIC_WORDS}
      render={getOptionProps => {
        const { options } = getOptionProps();
        return options.map((option, index) => (
          <li key={index}>
            <span>{option}</span>
          </li>
        ));
      }}
    />
  )).toMatchSnapshot();
});

test('Options uses render prop - optionRenderer', () => {
  expect(renderInSimpleTheme(
    <Options
      options={COUNTRIES_OPTIONS}
      optionRenderer={option => (
        <div>
          <span>{option.german}</span>
          <span>{option.english}</span>
        </div>
      )}
    />
  )).toMatchSnapshot();
});
