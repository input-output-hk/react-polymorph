import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Autocomplete from '../source/components/Autocomplete';
import Select from '../source/components/Select';

// skins
import SimpleAutocompleteSkin from '../source/skins/simple/AutocompleteSkin';
import SimpleSelectSkin from '../source/skins/simple/SelectSkin';

// themes
import {
  SimpleAutocompleteTheme,
  SimpleSelectTheme
} from '../source/themes/simple';

// constants
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

storiesOf('Options (through Select and Autocomplete)', module)
  .addDecorator(story => {
    const SimpleTheme = {
      select: { ...SimpleSelectTheme },
      autocomplete: { ...SimpleAutocompleteTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'Options - combined with Input to construct Select',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={OPTIONS_COLLECTION}
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'Options - combined with Input to construct Autocomplete',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={MNEMONIC_WORDS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        onChange={selectedOpts => store.set({ selectedOpts })}
        skin={SimpleAutocompleteSkin}
      />
    ))
  );
