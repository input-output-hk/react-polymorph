import React from 'react';

import { Options } from '../source/components/Options';
import { OptionsSkin } from '../source/skins/simple/OptionsSkin';
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
  const component = renderInSimpleTheme(
    <Options
      options={MNEMONIC_WORDS}
      skin={OptionsSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Options uses render prop - render', () => {
  const component = renderInSimpleTheme(
    <Options
      options={MNEMONIC_WORDS}
      skin={OptionsSkin}
      render={getOptionProps => {
        const { options } = getOptionProps();
        return options.map((option, index) => (
          <li key={index}>
            <span>{option}</span>
          </li>
        ));
      }}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Options uses render prop - optionRenderer', () => {
  const component = renderInSimpleTheme(
    <Options
      options={COUNTRIES_OPTIONS}
      skin={OptionsSkin}
      optionRenderer={option => (
        <div>
          <span>{option.german}</span>
          <span>{option.english}</span>
        </div>
      )}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
