// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Dropdown } from '../source/components/Dropdown';
import { Button } from '../source/components/Button';

// assets
import esIcon from './images/es.png';
import usIcon from './images/us.png';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const COUNTRY_ITEMS = [
  {
    value: 'es',
    label: <img src={esIcon} />
  }, {
    value: 'us',
    label: <img src={usIcon} />
  }
];

storiesOf('Dropdown', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('hover to open',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<Button label="Hover to pick language" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        noArrow
      />
    ))
  )
  .add('hover to open: arrow',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<Button label="Hover to pick language" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
      />
    ))
  )
  .add('click to open',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        noArrow
        clickToOpen
        label={<Button label="Click to pick language" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
      />
    ))
  )
  .add('click to open: arrow',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        clickToOpen
        label={<Button label="Click to pick language" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
      />
    ))
  );
