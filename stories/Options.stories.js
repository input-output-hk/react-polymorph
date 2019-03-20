// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Autocomplete } from '../source/components/Autocomplete';
import { Select } from '../source/components/Select';
import { Options } from '../source/components/Options';

// themes
import CustomOptionsTheme from './theme-customizations/Options.custom.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const OPTIONS_COLLECTION = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA' }
];

const MNEMONIC_WORDS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
];

storiesOf('Options', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('combined with Input to construct Select',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={OPTIONS_COLLECTION}
      />
    ))
  )

  .add('combined with Input to construct Autocomplete',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={MNEMONIC_WORDS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('custom theme', () => (
    <Options
      theme={CustomOptionsTheme}
      isOpen
      options={OPTIONS_COLLECTION}
      isOpeningUpward={false}
      noResults={false}
    />
  ));
