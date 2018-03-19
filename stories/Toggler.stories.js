import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { ThemeProvider, Checkbox } from '../source/components';

// skins
import { TogglerSkin } from '../source/skins/simple';

// themes
import SimpleTheme from '../source/themes/simple';
import CustomTogglerTheme from './theme-customizations/Toggler.custom.scss';

// theme API
import { IDENTIFIERS } from '../source/themes/API';

import themeOverrides from './theme-overrides/customToggler.scss';

storiesOf('Toggler', module)
  .addDecorator(story => {
    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('plain', withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeIdentifier={IDENTIFIERS.TOGGLER}
        labelLeft='Included'
        labelRight='Excluded'
        skin={TogglerSkin}
      />
    ))
  )

  .add('in text', withState({ checked: false }, store => (
      <div>
        <span>Fees&nbsp;</span>
        <Checkbox
          checked={store.state.checked}
          onChange={() => store.set({ checked: !store.state.checked })}
          themeIdentifier={IDENTIFIERS.TOGGLER}
          labelLeft='Included'
          labelRight='Excluded'
          skin={TogglerSkin}
        />
        <span>&nbsp;from the amount</span>
      </div>
    ))
  )

  .add('disabled', withState({ checked: false }, store => (
      <Checkbox
        disabled
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        labelLeft='Included'
        labelRight='Excluded'
        themeIdentifier={IDENTIFIERS.TOGGLER}
        skin={TogglerSkin}
      />
    ))
  )

  .add('composed theme', withState({ checked: false }, store => (
      <Checkbox
        themeOverrides={themeOverrides}
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeIdentifier={IDENTIFIERS.TOGGLER}
        labelLeft='Included'
        labelRight='Excluded'
        skin={TogglerSkin}
      />
    ))
  )

  .add('custom theme', withState({ checked: false }, store => (
      <Checkbox
        theme={CustomTogglerTheme}
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeIdentifier={IDENTIFIERS.TOGGLER}
        labelLeft='Included'
        labelRight='Excluded'
        skin={TogglerSkin}
      />
    ))
  );
