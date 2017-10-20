import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Select from '../source/components/Select';
import SimpleSelectSkin from '../source/skins/simple/SelectSkin';
import Autocomplete from '../source/components/Autocomplete';
import SimpleAutocompleteSkin from '../source/skins/simple/AutocompleteSkin';

const OPTIONS_COLLECTION = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

const MNEMONIC_WORDS = ['home', 'cat', 'dog', 'fish', 'hide', 'hover', 'duck', 'category', 'join', 'paper', 'box', 'tab'];

storiesOf('Options (throug Select and Autocomplete)', module)

.addDecorator((story) => {
  const onChangeAction = action('onChange');
  const state = observable({
    value: null,
    onChange: mobxAction((value, event) => {
      state.value = value;
      onChangeAction(value, event);
    })
  });
  return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
})

// ====== Stories ======

.add('Options - combined with Input to construct Select', () => (
  <Select
    options={OPTIONS_COLLECTION}
    skin={<SimpleSelectSkin />}
  />
))

.add('Options - combined with Input to construct Autocomplete', () => (
  <Autocomplete
    label="Recovery phrase"
    options={MNEMONIC_WORDS}
    placeholder="Enter mnemonic..."
    maxSelections={9}
    maxVisibleOptions={5}
    invalidCharsRegex= {/[^a-zA-Z]/g}
    skin={<SimpleAutocompleteSkin />}
  />
))
