// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { Dropdown } from '../source/components/Dropdown';
import { Button } from '../source/components/Button';

// assets
import esIcon from './images/es.png';
import usIcon from './images/us.png';

// custom styles
import styles from './Dropdown.stories.scss';

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

const CustomLabel = () => (
  <Button label="Pick a language" />
);

storiesOf('Dropdown', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('arrow bubble',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<CustomLabel />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
      />
    ))
  )

  .add('no arrow',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<CustomLabel />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        noArrow
      />
    ))
  );
