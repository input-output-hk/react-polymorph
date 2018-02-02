import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Checkbox from '../source/components/Checkbox';

// skins
import SimpleSwitchSkin from '../source/skins/simple/SwitchSkin';

// themes
import { SimpleSwitchTheme } from '../source/themes/simple';

// theme API
import { SWITCH_THEME_API } from '../source/themes/API';

storiesOf('Switch', module)
  .addDecorator(story => {
    const SimpleTheme = {
      checkbox: { ...{ SimpleSwitchTheme } }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'plain',
    withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeAPI={SWITCH_THEME_API}
        skin={SimpleSwitchSkin}
      />
    ))
  )

  .add(
    'disabled',
    withState({ checked: false }, store => (
      <Checkbox disabled themeAPI={SWITCH_THEME_API} skin={SimpleSwitchSkin} />
    ))
  )

  .add(
    'short label',
    withState({ checked: false }, store => (
      <Checkbox
        label="My switch"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeAPI={SWITCH_THEME_API}
        skin={SimpleSwitchSkin}
      />
    ))
  )

  .add(
    'disabled with label',
    withState({ checked: false }, store => (
      <Checkbox
        disabled
        label="My switch"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeAPI={SWITCH_THEME_API}
        skin={SimpleSwitchSkin}
      />
    ))
  )

  .add(
    'long label',
    withState({ checked: false }, store => (
      <Checkbox
        label="I understand that if this application is moved to another device or deleted,
               my money can be only recovered with the backup phrase which
               were written down in a secure place"
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeAPI={SWITCH_THEME_API}
        skin={SimpleSwitchSkin}
      />
    ))
  );
