import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import SimpleThemeProvider from './support/SimpleThemeProvider';
import PropsObserver from './support/PropsObserver';
import TextArea from '../lib/components/TextArea';
import SimpleTextAreaSkin from '../lib/skins/simple/TextAreaSkin';

storiesOf('TextArea', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
      onChange: mobxAction((value, event) => {
        state.value = value;
        onChangeAction(value, event);
      })
    });
    return (
      <SimpleThemeProvider>
        <PropsObserver propsForChildren={state}>
          {story()}
        </PropsObserver>
      </SimpleThemeProvider>
    );
  })

  // ====== Stories ======

  .add('plain', () => <TextArea value="" skin={<SimpleTextAreaSkin />} />)

  .add('label', () => <TextArea label="Your Comment" skin={<SimpleTextAreaSkin />} />)

  .add('placeholder', () => <TextArea placeholder="Your Comment" skin={<SimpleTextAreaSkin />} />)

  .add('maxLength(5)', () => <TextArea maxLength={5} skin={<SimpleTextAreaSkin />} />)

  .add('error', () => (
    <div>
      <TextArea label="With label" error="Something went wrong" skin={<SimpleTextAreaSkin />} />
      <TextArea error="Something went wrong" skin={<SimpleTextAreaSkin />} />
    </div>
  ))

  .add('rows={5}', () => (
    <TextArea
      skin={<SimpleTextAreaSkin />}
      label="Textarea with fixed amount of rows to start with"
      placeholder="Your description here"
      rows={5}
    />
  ))

  .add('autoResize={false}', () => (
    <TextArea
      skin={<SimpleTextAreaSkin />}
      label="Textarea without auto resizing"
      placeholder="Your description here"
      autoResize={false}
    />
  ));
