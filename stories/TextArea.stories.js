import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { TextArea, FormField } from '../source/components';

// skins
import { TextAreaSkin, FormFieldSkin } from '../source/skins/simple';

// themes
import CustomTextAreaTheme from './theme-customizations/TextArea.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customTextarea.scss';

storiesOf('TextArea', module)
  // ====== Stories ======

  .add('plain',
    withState({ value: '' }, store => (
      <TextArea
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={TextAreaSkin}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <FormField
        label="Your Comment"
        skin={FormFieldSkin}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            skin={TextAreaSkin}
          />
        )}
      />
    ))
  )

  .add('placeholder',
    withState({ value: '' }, store => (
      <TextArea
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="Your Comment"
        skin={TextAreaSkin}
      />
    ))
  )

  .add('autoFocus',
    withState({ value: '' }, store => (
      <TextArea
        autoFocus
        placeholder="autoFocus"
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={TextAreaSkin}
      />
    ))
  )

  .add('maxLength(5)',
    withState({ value: '' }, store => (
      <TextArea
        error="bad error"
        value={store.state.value}
        maxLength={5}
        onChange={value => store.set({ value })}
        skin={TextAreaSkin}
      />
    ))
  )

  .add('error',
    withState({ value: '' }, store => (
      <FormField
        label="With label"
        error="Something went wrong"
        skin={FormFieldSkin}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            skin={TextAreaSkin}
          />
        )}
      />
    ))
  )

  .add('rows={5}',
    withState({ value: '' }, store => (
      <FormField
        label="Textarea with fixed amount of rows to start with"
        skin={FormFieldSkin}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            placeholder="Your description here"
            rows={5}
            skin={TextAreaSkin}
          />
        )}
      />
    ))
  )

  .add('autoResize={false}',
    withState({ value: '' }, store => (
      <FormField
        label="Textarea without auto resizing"
        skin={FormFieldSkin}
        render={props => (
          <TextArea
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            placeholder="Your description here"
            autoResize={false}
            skin={TextAreaSkin}
          />
        )}
      />
    ))
  )

  .add('theme overrides',
    withState({ value: '' }, store => (
      <TextArea
        themeOverrides={themeOverrides}
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="type here..."
        skin={TextAreaSkin}
      />
    ))
  )

  .add('custom theme',
    withState({ value: '' }, store => (
      <TextArea
        theme={CustomTextAreaTheme}
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="type here..."
        skin={TextAreaSkin}
      />
    ))
  );
