// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Checkbox } from '../source/components/Checkbox';

// themes
import CustomTogglerTheme from './theme-customizations/Toggler.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customToggler.scss';
import { IDENTIFIERS } from '../source/components';

// theme
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Toggler', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain',
    withState({ checked: false }, store => (
      <Checkbox
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.TOGGLER}
        labelLeft="Included"
        labelRight="Excluded"
      />
    ))
  )

  .add('in text',
    withState({ checked: false }, store => (
      <div>
        <span>Fees&nbsp;</span>
        <Checkbox
          checked={store.state.checked}
          onChange={() => store.set({ checked: !store.state.checked })}
          themeId={IDENTIFIERS.TOGGLER}
          labelLeft="Included"
          labelRight="Excluded"
        />
        <span>&nbsp;from the amount</span>
      </div>
    ))
  )

  .add('disabled',
    withState({ checked: false }, store => (
      <Checkbox
        disabled
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        labelLeft="Included"
        labelRight="Excluded"
        themeId={IDENTIFIERS.TOGGLER}
      />
    ))
  )

  .add('theme overrides',
    withState({ checked: false }, store => (
      <Checkbox
        themeOverrides={themeOverrides}
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.TOGGLER}
        labelLeft="Included"
        labelRight="Excluded"
      />
    ))
  )

  .add('custom theme',
    withState({ checked: false }, store => (
      <Checkbox
        theme={CustomTogglerTheme}
        checked={store.state.checked}
        onChange={() => store.set({ checked: !store.state.checked })}
        themeId={IDENTIFIERS.TOGGLER}
        labelLeft="Included"
        labelRight="Excluded"
      />
    ))
  );
