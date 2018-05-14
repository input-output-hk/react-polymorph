import React from 'react';
import renderer from 'react-test-renderer';

import { Options } from '../source/components';
import { OptionsSkin } from '../source/skins/simple';
import OptionsTheme from '../source/themes/simple/SimpleOptions.scss';

const SimpleTheme = { options: OptionsTheme };

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

test('Options renders to the DOM', () => {
  const component = renderer.create(
    <Options
      options={MNEMONIC_WORDS}
      theme={SimpleTheme}
      skin={OptionsSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Options renders via render prop', () => {
  const component = renderer.create(
    <Options
      options={MNEMONIC_WORDS}
      theme={SimpleTheme}
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

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Options renders via optionRenderer', () => {
  const component = renderer.create(
    <Options
      options={COUNTRIES_OPTIONS}
      theme={SimpleTheme}
      skin={OptionsSkin}
      optionRenderer={option => (
        <div>
          <span>{option.german}</span>
          <span>{option.english}</span>
        </div>
      )}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
