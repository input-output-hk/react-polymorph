import React from 'react';
import renderer from 'react-test-renderer';

import { TextArea } from '../source/components';
import { TextAreaSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

test('TextArea renders correctly', () => {
  const component = renderer.create(
    <TextArea context={CONTEXT} skin={TextAreaSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with placeholder', () => {
  const component = renderer.create(
    <TextArea
      placeholder="0.0000"
      context={CONTEXT}
      skin={TextAreaSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with an error', () => {
  const component = renderer.create(
    <TextArea
      error="Please enter valid input"
      context={CONTEXT}
      skin={TextAreaSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with a value', () => {
  const component = renderer.create(
    <TextArea
      value="this one has a value"
      context={CONTEXT}
      skin={TextAreaSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with 5 rows', () => {
  const component = renderer.create(
    <TextArea
      rows={5}
      context={CONTEXT}
      skin={TextAreaSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
