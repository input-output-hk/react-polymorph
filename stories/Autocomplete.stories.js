import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Autocomplete from '../source/components/Autocomplete';
import SimpleAutocompleteSkin from '../source/skins/simple/AutocompleteSkin';

const SUGGESTED_WORDS = ['home', 'cat', 'dog', 'fish', 'hide', 'hover', 'duck', 'category', 'join', 'paper', 'box', 'tab'];

storiesOf('Autocomplete', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const onKeyAction = action('onKeyDown');
    const state = observable({
      value: '',
      onChange: mobxAction((value, event) => {
        state.value = value;
        onChangeAction(value, event);
      }),
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('Enter mnemonics - plain', () => <Autocomplete skin={<SimpleAutocompleteSkin />} /> )

  .add('Enter mnemonics - label', () => (
    <Autocomplete
      label="Recovery phrase"
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics - placeholder', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics - error', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      error="Please enter mnemonics in right order"
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics (9-word mnemonic) - not sorted', () => (
    <Autocomplete
      label="Recovery phrase"
      suggestedWords = {SUGGESTED_WORDS}
      placeholder="Enter mnemonic..."
      sortAlphabetically={false}
      multipleSameSelections={false}
      maxSelections={9}
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics (9-word mnemonic) - sorted with multiple same selections', () => (
    <Autocomplete
      label="Recovery phrase"
      suggestedWords = {SUGGESTED_WORDS}
      placeholder="Enter mnemonic..."
      maxSelections={9}
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics - (12-word mnemonic) with 5 visible suggestions', () => (
    <Autocomplete
      label="Recovery phrase"
      suggestedWords = {SUGGESTED_WORDS}
      placeholder="Enter mnemonic..."
      maxSelections={12}
      maxVisibleSuggestions={5}
      skin={<SimpleAutocompleteSkin />}
    />
  ))

  .add('Enter mnemonics - (12-word mnemonic) with 5 visible suggestions and regex that allows only letters', () => (
    <Autocomplete
      label="Recovery phrase"
      suggestedWords = {SUGGESTED_WORDS}
      placeholder="Enter mnemonic..."
      maxSelections={12}
      maxVisibleSuggestions={5}
      invalidCharsRegex= {/[^a-zA-Z]/g}
      skin={<SimpleAutocompleteSkin />}
    />
  ))
