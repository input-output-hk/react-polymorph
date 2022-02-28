import React from 'react';

import { FormField } from '../source/components/FormField';
import { renderInSimpleTheme } from './helpers/theming';

const renderFormField = () => <div className="render-prop" />;

test('FormField renders correctly', () => {
  expect(
    renderInSimpleTheme(<FormField render={renderFormField} />)
  ).toMatchSnapshot();
});

test('FormField renders with label', () => {
  expect(
    renderInSimpleTheme(
      <FormField label="Add a Label" render={renderFormField} />
    )
  ).toMatchSnapshot();
});

test('FormField renders an input element', () => {
  expect(
    renderInSimpleTheme(
      <FormField render={() => <input className="render-prop" />} />
    )
  ).toMatchSnapshot();
});
