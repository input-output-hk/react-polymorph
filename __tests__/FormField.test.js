import React from 'react';
import renderer from 'react-test-renderer';

import { FormField } from '../source/components';
import { FormFieldSkin } from '../source/skins/simple';
import { CONTEXT } from './helpers/context';

const renderFormField = () => <div className="render-prop" />;

test('FormField renders correctly', () => {
  const component = renderer.create(
    <FormField
      context={CONTEXT}
      skin={FormFieldSkin}
      render={renderFormField}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField renders with label', () => {
  const component = renderer.create(
    <FormField
      label="Add a Label"
      context={CONTEXT}
      skin={FormFieldSkin}
      render={renderFormField}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField renders with an error', () => {
  const component = renderer.create(
    <FormField
      error="Add an Error"
      context={CONTEXT}
      skin={FormFieldSkin}
      render={renderFormField}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField is disabled', () => {
  const component = renderer.create(
    <FormField
      disabled
      context={CONTEXT}
      skin={FormFieldSkin}
      render={({ disabled }) => <span>{disabled.toString()}</span>}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField renders an input element', () => {
  const component = renderer.create(
    <FormField
      context={CONTEXT}
      skin={FormFieldSkin}
      render={() => <input className="render-prop" />}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
