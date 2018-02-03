import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import TextArea from '../source/components/TextArea';
import FormField from '../source/components/FormField';

// skins
import SimpleTextAreaSkin from '../source/skins/simple/TextAreaSkin';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';

// themes
import {
  SimpleTextAreaTheme,
  SimpleFormFieldTheme
} from '../source/themes/simple';

// themeOverrides
import themeOverrides from './styles/customTextarea.scss';

storiesOf('TextArea', module)
  .addDecorator(story => {
    const SimpleTheme = {
      textarea: { ...SimpleTextAreaTheme },
      formfield: { ...SimpleFormFieldTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })
  // ====== Stories ======

  .add(
    'plain',
    withState({ value: '' }, store => (
      <TextArea
        value={store.state.value}
        onChange={(value, event) => store.set({ value })}
        skin={SimpleTextAreaSkin}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, store => (
      <FormField
        label="Your Comment"
        skin={SimpleFormFieldSkin}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleTextAreaSkin}
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
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleTextAreaSkin}
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
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            placeholder="Your description here"
            rows={5}
            skin={SimpleTextAreaSkin}
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
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            placeholder="Your description here"
            autoResize={false}
            skin={SimpleTextAreaSkin}
          />
        )}
      />
    ))
  )

  .add(
    'composed theme',
    withState({ value: '' }, store => (
      <TextArea
        themeOverrides={themeOverrides}
        value={store.state.value}
        onChange={(value, event) => store.set({ value })}
        placeholder="type here..."
        skin={SimpleTextAreaSkin}
      />
    ))
  );
