import React from 'react';
import renderer from 'react-test-renderer';

import { Autocomplete } from '../source/components';
import { AutocompleteSkin } from '../source/skins/simple';

const MNEMONIC_WORDS = [
  'home',
  'cat',
  'dog',
  'fish'
];

test('Autocomplete renders correctly', () => {
  const component = renderer.create(
    <Autocomplete options={MNEMONIC_WORDS} skin={AutocompleteSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with label', () => {
  const component = renderer.create(
    <Autocomplete
      label="Enter your recovery phrase below"
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with a placeholder', () => {
  const component = renderer.create(
    <Autocomplete
      placeholder="Enter recovery phrase"
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with an error', () => {
  const component = renderer.create(
    <Autocomplete
      error="Your mnemonic phrase is incorrect"
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete is disabled', () => {
  const component = renderer.create(
    <Autocomplete
      disabled
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderSelections', () => {
  const component = renderer.create(
    <Autocomplete
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
      renderSelections={getSelectionProps => {
        const { selectedOptions, removeSelection } = getSelectionProps();

        return selectedOptions.map((option, index) => (
          <span key={index}>
            <span>{option}</span>

            <span>
              remove selection
              <button onClick={removeSelection.bind(null, option)} />
            </span>
          </span>
        ));
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderOptions', () => {
  const component = renderer.create(
    <Autocomplete
      options={MNEMONIC_WORDS}
      skin={AutocompleteSkin}
      renderOptions={getOptionProps => {
        const { options } = getOptionProps();

        return options.map((option, index) => (
          <li key={index}>
            <span>{`#${index}: ${option}`}</span>
          </li>
        ));
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
