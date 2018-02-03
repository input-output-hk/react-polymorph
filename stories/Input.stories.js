import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import FormField from '../source/components/FormField';
import Input from '../source/components/Input';

// skins
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';
import SimpleInputSkin from '../source/skins/simple/InputSkin';

// themes
import {
  SimpleFormFieldTheme,
  SimpleInputTheme
} from '../source/themes/simple';

// themeOverrides
import themeOverrides from './styles/customInput.scss';

storiesOf('Input', module)
  .addDecorator(story => {
    const SimpleTheme = {
      formfield: { ...SimpleFormFieldTheme },
      input: { ...SimpleInputTheme }
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
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
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
        skin={SimpleInputSkin}
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
        skin={SimpleInputSkin}
      />
    ))
  )

  .add('disabled', () => (
    <FormField
      disabled
      label="Disabled Input"
      skin={SimpleFormFieldSkin}
      render={props => (
        <Input {...props} placeholder="user name" skin={SimpleInputSkin} />
      )}
    />
  ))

  .add(
    'error',
    withState({ value: '' }, store => (
      <FormField
        label="With Label"
        error="Something went wrong"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
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
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="min length"
            minLength={8}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
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
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
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
        skin={SimpleInputSkin}
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
        skin={SimpleInputSkin}
      />
    ))
  )

  .add(
    'onKeyPress',
    withState({ value: '' }, store => (
      <FormField
        label="Type to see events logged"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            value={store.state.value}
            placeholder="max length"
            maxLength={5}
            onKeyPress={action('onKeyPress')}
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  )

  .add(
    'composed theme',
    withState({ value: '' }, store => (
      <FormField
        label="Input with a composed theme"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Input
            {...props}
            themeOverrides={themeOverrides}
            value={store.state.value}
            placeholder="type here..."
            onChange={(value, event) => store.set({ value })}
            skin={SimpleInputSkin}
          />
        )}
      />
    ))
  );
