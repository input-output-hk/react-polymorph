import React from 'react';

import { Autocomplete } from '../source/components/Autocomplete';
import { renderInSimpleTheme } from './helpers/theming';

const OPTIONS = [
  'home',
  'cat',
  'dog',
  'fish'
];

test('Autocomplete renders correctly', () => {
  expect(renderInSimpleTheme(
    <Autocomplete options={OPTIONS} />
  )).toMatchSnapshot();
});

test('Autocomplete renders with label', () => {
  expect(renderInSimpleTheme(
    <Autocomplete
      label="Enter your recovery phrase below"
      options={OPTIONS}
    />
  )).toMatchSnapshot();
});

test('Autocomplete renders with a placeholder', () => {
  expect(renderInSimpleTheme(
    <Autocomplete
      placeholder="Enter recovery phrase"
      options={OPTIONS}
    />
  )).toMatchSnapshot();
});

test('Autocomplete renders with an error', () => {
  expect(renderInSimpleTheme(
    <Autocomplete
      error="Your mnemonic phrase is incorrect"
      options={OPTIONS}
    />
  )).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderSelections', () => {
  expect(renderInSimpleTheme(
    <Autocomplete
      options={OPTIONS}
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
  )).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderOptions', () => {
  expect(renderInSimpleTheme(
    <Autocomplete
      options={OPTIONS}
      renderOptions={getOptionProps => {
        const { options } = getOptionProps({});

        return options.map((option, index) => (
          <li key={index}>
            <span>{`#${index}: ${option}`}</span>
          </li>
        ));
      }}
    />
  )).toMatchSnapshot();
});
