import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Checkbox } from '../source/components';

// skins
import { CheckboxSkin } from '../source/skins/simple';

// themes
import CustomCheckboxTheme from './theme-customizations/Checkbox.custom.scss';

// custom styles & theme overrides
import themeOverrides from './theme-overrides/customCheckbox.scss';

storiesOf('Checkbox', module)
  // ====== Stories ======

  .add('plain',
    withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  )

  .add('disabled', () => <Checkbox disabled skin={CheckboxSkin} />)

  .add('short label',
    withState({ checked: false }, store => (
      <Checkbox
        label="My checkbox"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  )

  .add('disabled with label', () => (
    <Checkbox disabled label="My checkbox" skin={CheckboxSkin} />
  ))

  .add('long label',
    withState({ checked: false }, store => (
      <Checkbox
        label="I understand that if this application is moved to another device
              or deleted, my money can be only recovered with the backup phrase
              which were written down in a secure place"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  )

  .add('html label',
    withState({ checked: false }, store => (
      <Checkbox
        label={
          <div>
            Example for a <strong>bold</strong> word in an html label
          </div>
        }
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  )

  .add('theme overrides',
    withState({ checked: false }, store => (
      <Checkbox
        themeOverrides={themeOverrides}
        label="check here"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  )

  .add('custom theme',
    withState({ checked: true }, store => (
      <Checkbox
        theme={CustomCheckboxTheme}
        label="check here"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        skin={CheckboxSkin}
      />
    ))
  );
