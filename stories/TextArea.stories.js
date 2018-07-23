// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components & skins
import { TextArea } from '../source/components/TextArea';
import { TextAreaSkin } from '../source/skins/simple/TextAreaSkin';

// themes
import CustomTextAreaTheme from './theme-customizations/TextArea.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customTextarea.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('TextArea', module)

  .addDecorator(decorateWithSimpleTheme)

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
      <TextArea
        label="Your Comment"
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={TextAreaSkin}
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

  .add('disabled',
    withState({ value: '' }, store => (
      <TextArea
        disabled
        label="Your Comment"
        value={store.state.value}
        onChange={value => store.set({ value })}
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

  .add('onFocus / onBlur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <TextArea
        value={store.state.value}
        placeholder="onFocus / onBlur"
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true, blurred: false })}
        onBlur={() => store.set({ blurred: true, focused: false })}
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

  .add('with error',
    withState({ value: '' }, store => (
      <TextArea
        label="With label"
        error="Something went wrong"
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={TextAreaSkin}
      />
    ))
  )

  .add('rows={5}',
    withState({ value: '' }, store => (
      <TextArea
        label="Textarea with fixed amount of rows to start with"
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="Your description here"
        rows={5}
        skin={TextAreaSkin}
      />
    ))
  )

  .add('autoResize={false}',
    withState({ value: '' }, store => (
      <TextArea
        label="Textarea without auto resizing"
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="Your description here"
        autoResize={false}
        skin={TextAreaSkin}
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
