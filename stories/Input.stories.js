import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { FormField, Input } from '../source/components';

// skins
import { FormFieldSkin, InputSkin } from '../source/skins/simple';

// themes
import CustomInputTheme from './theme-customizations/Input.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customInput.scss';

storiesOf('Input', module)
  // ====== Stories ======

  .add('plain',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('placeholder',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        placeholder="user name"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('autoFocus',
    withState({ value: '' }, store => (
      <Input
        autoFocus
        value={store.state.value}
        placeholder="autoFocus"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('disabled', () => (
    <FormField
      disabled
      label="Disabled Input"
      skin={FormFieldSkin}
      render={props => (
        <Input {...props} placeholder="user name" skin={InputSkin} />
      )}
    />
  ))

  .add('error',
    withState({ value: '' }, store => (
      <FormField
        label="With Label"
        error="Something went wrong"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('minLength(8)',
    withState({ value: '' }, store => (
      <FormField
        label="Input with min. 5 Characters"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="min length"
            minLength={8}
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('maxLength(5)',
    withState({ value: '' }, store => (
      <FormField
        label="Input with max. 5 Characters"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('type=password',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        type="password"
        placeholder="password"
        onChange={value => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add('focus / blur',
    withState({ value: '', focused: false, blurred: false }, store => (
      <Input
        value={store.state.value}
        placeholder="focus / blur"
        onChange={value => store.set({ value })}
        onFocus={() => store.set({ focused: true })}
        onBlur={() => store.set({ blurred: true })}
        skin={InputSkin}
      />
    ))
  )

  .add('onKeyPress',
    withState({ value: '' }, store => (
      <FormField
        label="Type to see events logged"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onKeyPress={action('onKeyPress')}
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('theme overrides',
    withState({ value: '' }, store => (
      <FormField
        label="Theme overrides"
        skin={FormFieldSkin}
        render={() => (
          <Input
            themeOverrides={themeOverrides}
            value={store.state.value}
            placeholder="type here..."
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add('custom theme',
    withState({ value: '' }, store => (
      <FormField
        label="Custom theme"
        skin={FormFieldSkin}
        render={() => (
          <Input
            theme={CustomInputTheme}
            value={store.state.value}
            placeholder="type here..."
            onChange={value => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  );
