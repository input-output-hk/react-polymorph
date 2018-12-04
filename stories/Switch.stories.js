// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Checkbox } from '../source/components/Checkbox';

// themes
import CustomSwitchTheme from './theme-customizations/Switch.custom.scss';

// custom styles & theme overrides
import themeOverrides from './theme-overrides/customSwitch.scss';
import { IDENTIFIERS } from '../source/components';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Switch', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain',
    withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.SWITCH}
      />
    ))
  )

  .add('disabled', () => (
    <Checkbox disabled themeId={IDENTIFIERS.SWITCH} />
  ))

  .add('short label',
    withState({ checked: false }, store => (
      <Checkbox
        label="My switch"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.SWITCH}
      />
    ))
  )

  .add('disabled with label',
    withState({ checked: false }, store => (
      <Checkbox
        disabled
        label="My switch"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.SWITCH}
      />
    ))
  )

  .add('long label',
    withState({ checked: false }, store => (
      <Checkbox
        label="I understand that if this application is moved to another device
              or deleted, my money can be only recovered with the backup phrase
              which were written down in a secure place"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.SWITCH}
      />
    ))
  )

  .add('theme overrides',
    withState({ checked: false }, store => (
      <div style={{ margin: '15px' }}>
        <Checkbox
          themeId={IDENTIFIERS.SWITCH}
          themeOverrides={themeOverrides}
          label="theme overrides"
          checked={store.state.checked}
          onChange={() => store.set({ checked: !store.state.checked })}
        />
      </div>
    ))
  )

  .add('custom theme',
    withState({ checked: false }, store => (
      <div style={{ margin: '15px' }}>
        <Checkbox
          themeId={IDENTIFIERS.SWITCH}
          theme={CustomSwitchTheme}
          label="custom theme"
          checked={store.state.checked}
          onChange={() => store.set({ checked: !store.state.checked })}
        />
      </div>
    ))
  );
