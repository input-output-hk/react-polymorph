import React from 'react';
import renderer from 'react-test-renderer';

import { TextArea } from '../source/components';
import { TextAreaSkin } from '../source/skins/simple';

test('TextArea renders to the DOM', () => {
  const component = renderer.create(
    <TextArea autoResize={false} skin={TextAreaSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with placeholder', () => {
  const component = renderer.create(
    <TextArea autoResize={false} placeholder="0.0000" skin={TextAreaSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with a value', () => {
  const component = renderer.create(
    <TextArea autoResize={false} value={"this one has a value"} skin={TextAreaSkin} />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea has rows', () => {
  const component = renderer.create(
    <TextArea
      autoResize={false}
      rows={5}
      skin={TextAreaSkin}
    />
  );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
