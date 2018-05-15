import React from 'react';
import renderer from 'react-test-renderer';

import { Options } from '../source/components';
import { OptionsSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

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
  const component = renderer.create(
    <Options
      options={MNEMONIC_WORDS}
      context={CONTEXT}
      skin={OptionsSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Options uses render prop - render', () => {
  const component = renderer.create(
    <Options
      options={MNEMONIC_WORDS}
      context={CONTEXT}
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

test('Options uses render prop - optionRenderer', () => {
  const component = renderer.create(
    <Options
      options={COUNTRIES_OPTIONS}
      context={CONTEXT}
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
