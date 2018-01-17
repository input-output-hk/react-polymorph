import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

import FormField from '../source/components/FormField';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import simpleFormField from '../source/themes/simple/SimpleFormField.scss';

import TextArea from '../source/components/TextArea';
import SimpleTextAreaSkin from '../source/skins/simple/TextAreaSkin';
import simpleTextArea from '../source/themes/simple/SimpleTextArea.scss';

storiesOf('TextArea', module)
  // ====== Stories ======

  .add(
    'plain',
    withState({ value: '' }, store => (
      <TextArea
        value={store.state.value}
        onChange={(value, event) => store.set({ value })}
        skin={SimpleTextAreaSkin}
        theme={simpleTextArea}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, store => (
      <FormField
        label="Your Comment"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />
    ))
  )

  .add(
    'placeholder',
    withState({ value: '' }, store => (
      <TextArea
        value={store.state.value}
        onChange={(value, event) => store.set({ value })}
        placeholder="Your Comment"
        skin={SimpleTextAreaSkin}
        theme={simpleTextArea}
      />
    ))
  )

  .add(
    'autoFocus',
    withState({ value: '' }, store => (
      <TextArea
        autoFocus
        placeholder="autoFocus"
        value={store.state.value}
        onChange={(value, event) => store.set({ value })}
        skin={SimpleTextAreaSkin}
        theme={simpleTextArea}
      />
    ))
  )

  .add(
    'maxLength(5)',
    withState({ value: '' }, store => (
      <TextArea
        error="bad error"
        value={store.state.value}
        maxLength={5}
        onChange={(value, event) => store.set({ value })}
        skin={SimpleTextAreaSkin}
        theme={simpleTextArea}
      />
    ))
  )

  .add(
    'error',
    withState({ value: '' }, store => (
      <FormField
        label="With label"
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />
    ))
  )

  .add(
    'rows={5}',
    withState({ value: '' }, store => (
      <FormField
        label="Textarea with fixed amount of rows to start with"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            placeholder="Your description here"
            rows={5}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />
    ))
  )

  .add(
    'autoResize={false}',
    withState({ value: '' }, store => (
      <FormField
        label="Textarea without auto resizing"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            placeholder="Your description here"
            autoResize={false}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />
    ))
  );
