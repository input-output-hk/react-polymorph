// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Dropdown } from '../source/components/Dropdown';
import { Button } from '../source/components/Button';

// styles
import styles from './Dropdown.stories.scss';

// assets
import esIcon from './images/es.png';
import usIcon from './images/us.png';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const COUNTRY_ITEMS = [
  {
    value: 'es',
    label: (
      <div className={styles.flagLabel}>
        <img src={esIcon} />
        <span>Spain</span>{/* eslint-disable-line */}
      </div>
    ),
  }, {
    value: 'us',
    label: (
      <div className={styles.flagLabel}>
        <img src={usIcon} />
        <span>USA</span>{/* eslint-disable-line */}
      </div>
    ),
  }
];

storiesOf('Dropdown', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('hover to open',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<Button label="Hover to pick location" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        noArrow
        optionHeight={52}
      />
    ))
  )
  .add('hover to open: arrow',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        label={<Button label="Hover to pick location" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        optionHeight={52}
      />
    ))
  )
  .add('click to open',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        noArrow
        clickToOpen
        label={<Button label="Click to pick location" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        optionHeight={52}
      />
    ))
  )
  .add('click to open: arrow',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        clickToOpen
        label={<Button label="Click to pick location" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        optionHeight={52}
      />
    ))
  )
  .add('custom optionsRenderer',
    withState({ value: COUNTRY_ITEMS[0] }, store => (
      <Dropdown
        clickToOpen
        label={<Button label="Click to pick location" />}
        activeItem={store.state.value}
        onItemSelected={value => {
          store.set({ value });
        }}
        items={COUNTRY_ITEMS}
        optionRenderer={o => (
          <div className={styles.customOption}>{o.label}</div>
        )}
        optionHeight={52}
      />
    ))
  );
