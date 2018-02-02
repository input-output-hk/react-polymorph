import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Checkbox from '../source/components/Checkbox';

// skins
import SimpleTogglerSkin from '../source/skins/simple/TogglerSkin';

// themes
import { SimpleTogglerTheme } from '../source/themes/simple';

// theme API
import { TOGGLER_THEME_API } from '../source/themes/API';

storiesOf('Toggler', module)
  .addDecorator(story => {
    const SimpleTheme = { checkbox: { ...SimpleTogglerTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'plain',
    withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeAPI={TOGGLER_THEME_API}
        labelLeft="Included"
        labelRight="Excluded"
        skin={SimpleTogglerSkin}
      />
    ))
  )

  .add(
    'in text',
    withState({ checked: false }, store => (
      <div>
        <span>Fees&nbsp;</span>
        <Checkbox
          checked={store.state.checked}
          onChange={() => store.set({ checked: !store.state.checked })}
          themeAPI={TOGGLER_THEME_API}
          labelLeft="Included"
          labelRight="Excluded"
          skin={SimpleTogglerSkin}
        />
        <span>&nbsp;from the amount</span>
      </div>
    ))
  )

  .add(
    'disabled',
    withState({ checked: false }, store => (
      <Checkbox
        disabled
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        labelLeft="Included"
        labelRight="Excluded"
        themeAPI={TOGGLER_THEME_API}
        skin={SimpleTogglerSkin}
      />
    ))
  );
