import React from 'react';

import { Autocomplete } from '../source/components/Autocomplete';
import { AutocompleteSkin } from '../source/skins/simple/AutocompleteSkin';
import { renderInSimpleTheme } from './helpers/theming';

const OPTIONS = [
  'home',
  'cat',
  'dog',
  'fish'
];

test('Autocomplete renders correctly', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      options={OPTIONS}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with label', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      label="Enter your recovery phrase below"
      options={OPTIONS}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with a placeholder', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      placeholder="Enter recovery phrase"
      options={OPTIONS}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with an error', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      error="Your mnemonic phrase is incorrect"
      options={OPTIONS}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderSelections', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      options={OPTIONS}
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

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderOptions', () => {
  const component = renderInSimpleTheme(
    <Autocomplete
      options={OPTIONS}
      skin={AutocompleteSkin}
      renderOptions={getOptionProps => {
        const { options } = getOptionProps({});

        return options.map((option, index) => (
          <li key={index}>
            <span>{`#${index}: ${option}`}</span>
          </li>
        ));
      }}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
