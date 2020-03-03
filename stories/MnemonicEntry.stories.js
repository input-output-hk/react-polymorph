// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { MnemonicEntry } from '../source/components/MnemonicEntry';

// // theme overrides and styles
import styles from './MnemonicEntry.stories.scss';
import { decorateWithSimpleTheme } from './helpers/theming';

const MNEMONIC_WORDS = [
  'dog',
  'cat',
  'fish',
  'bird',
  'horse',
  'dinosaur',
  'lane',
  'curve',
  'street',
  'boy',
  'river',
  'run',
  'climb',
  'over',
  'music',
];

storiesOf('MnemonicEntry', module)

  .addDecorator(decorateWithSimpleTheme)

  // ======  Stories ======

  .add('Mnemonic Entry', () => (
    <MnemonicEntry label="Enter Your Recovery Phrase" mnemonicWords={MNEMONIC_WORDS} />
  ));
