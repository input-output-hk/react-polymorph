import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';

import FormField from '../source/components/FormField';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import simpleFormField from '../source/themes/simple/SimpleFormField.scss';

import TextArea from '../source/components/TextArea';
import SimpleTextAreaSkin from '../source/skins/simple/TextAreaSkin';
import simpleTextArea from '../source/themes/simple/SimpleTextArea.scss';

storiesOf('TextArea', module)
  .addDecorator(story => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
      onChange: mobxAction(event => {
        event.persist();
        state.value = event.target.value;
        onChangeAction(event.target.value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <TextArea value="" skin={SimpleTextAreaSkin} theme={simpleTextArea} />
  ))

  .add('label', () => (
    <FormField
      label="Your Comment"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <TextArea {...props} skin={SimpleTextAreaSkin} theme={simpleTextArea} />
      )}
    />
  ))

  .add('placeholder', () => (
    <TextArea
      placeholder="Your Comment"
      skin={SimpleTextAreaSkin}
      theme={simpleTextArea}
    />
  ))

  .add('auto focus', () => (
    <TextArea
      autoFocus
      placeholder="Your Description"
      skin={SimpleTextAreaSkin}
      theme={simpleTextArea}
    />
  ))

  .add('maxLength(5)', () => (
    <TextArea maxLength={5} skin={SimpleTextAreaSkin} theme={simpleTextArea} />
  ))

  .add('error', () => (
    <div>
      <FormField
        label="With label"
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />

      <FormField
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        theme={simpleFormField}
        render={props => (
          <TextArea
            {...props}
            skin={SimpleTextAreaSkin}
            theme={simpleTextArea}
          />
        )}
      />
    </div>
  ))

  .add('rows={5}', () => (
    <FormField
      label="Textarea with fixed amount of rows to start with"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <TextArea
          {...props}
          placeholder="Your description here"
          rows={5}
          skin={SimpleTextAreaSkin}
          theme={simpleTextArea}
        />
      )}
    />
  ))

  .add('autoResize={false}', () => (
    <FormField
      label="Textarea without auto resizing"
      skin={SimpleFormFieldSkin}
      theme={simpleFormField}
      render={props => (
        <TextArea
          {...props}
          placeholder="Your description here"
          autoResize={false}
          skin={SimpleTextAreaSkin}
          theme={simpleTextArea}
        />
      )}
    />
  ));
