import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { ThemeProvider, FormField, Input } from '../source/components';

// skins
import { FormFieldSkin, InputSkin } from '../source/skins/simple';

// themes
import { FormFieldTheme, InputTheme } from '../source/themes/simple';

// themeOverrides
import themeOverrides from './styles/customInput.scss';

storiesOf('Input', module)
  .addDecorator(story => {
    const SimpleTheme = {
      formfield: { ...FormFieldTheme },
      input: { ...InputTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })
  // ====== Stories ======

  .add(
    'Plain',
    withState({ value: '' }, store => (
      <Input
        {...store.state}
        onChange={(value, event) => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'placeholder',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        placeholder="user name"
        onChange={(value, event) => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add(
    'autoFocus',
    withState({ value: '' }, store => (
      <Input
        autoFocus
        value={store.state.value}
        placeholder="autoFocus"
        onChange={(value, event) => store.set({ value })}
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

  .add(
    'error',
    withState({ value: '' }, store => (
      <FormField
        label="With Label"
        error="Something went wrong"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'minLength(8)',
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
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'maxLength(5)',
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
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'type=password',
    withState({ value: '' }, store => (
      <Input
        value={store.state.value}
        type="password"
        placeholder="password"
        onChange={(value, event) => store.set({ value })}
        skin={InputSkin}
      />
    ))
  )

  .add(
    'focus / blur',
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

  .add(
    'onKeyPress',
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
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'composed theme',
    withState({ value: '' }, store => (
      <FormField
        label="Input w/ composed theme"
        skin={FormFieldSkin}
        render={props => (
          <Input
            {...props}
            themeOverrides={themeOverrides}
            value={store.state.value}
            placeholder="type here..."
            onChange={(value, event) => store.set({ value })}
            skin={InputSkin}
          />
        )}
      />
    ))
  );
