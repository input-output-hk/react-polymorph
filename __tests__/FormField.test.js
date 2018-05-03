import React from 'react';
import renderer from 'react-test-renderer';

import { FormField } from '../source/components';
import { FormFieldSkin } from '../source/skins/simple';

const renderFormField = () => (
  <div className="render-prop"></div>
);

test('FormField renders to the DOM', () => {
  const component = renderer.create(
    <FormField skin={FormFieldSkin} render={renderFormField} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField renders with label', () => {
  const component = renderer.create(
    <FormField
      label="Add a Label"
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
      skin={FormFieldSkin}
      render={({ disabled }) => <span>{disabled.toString()}</span>}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormField should render an input element', () => {
  const component = renderer.create(
    <FormField
      skin={FormFieldSkin}
      render={() => <input />}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
