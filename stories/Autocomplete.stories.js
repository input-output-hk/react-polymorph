import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import ThemeProvider from '../source/components/ThemeProvider';

import Autocomplete from '../source/components/Autocomplete';
import SimpleAutocompleteSkin from '../source/skins/simple/AutocompleteSkin';
import simpleAutocomplete from '../source/themes/simple/SimpleAutocomplete.scss';
// import Modal from '../source/components/Modal';
// import Button from '../source/components/Button';
// import SimpleModalSkin from '../source/skins/simple/ModalSkin';
// import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';
import styles from './Autocomplete.stories.scss';

const OPTIONS = [
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

storiesOf('Autocomplete', module)
  .addDecorator(story => {
    const simpleAutocompleteTheme = { autocomplete: { ...simpleAutocomplete } };

    return (
      <ThemeProvider theme={simpleAutocompleteTheme}>{story()}</ThemeProvider>
    );
  })

  // ====== Stories ======

  .add('Enter mnemonics - plain', () => (
    <Autocomplete skin={SimpleAutocompleteSkin} />
  ))

  .add('Enter mnemonics - label', () => (
    <Autocomplete label="Recovery phrase" skin={SimpleAutocompleteSkin} />
  ))

  .add('Enter mnemonics - placeholder', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      skin={SimpleAutocompleteSkin}
    />
  ))

  .add('Enter mnemonics - error', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      error="Please enter mnemonics in right order"
      skin={SimpleAutocompleteSkin}
    />
  ))

  .add(
    'Enter mnemonics (9-word mnemonic) - not sorted',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        sortAlphabetically={false}
        multipleSameSelections={false}
        maxSelections={9}
        skin={SimpleAutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics (9-word mnemonic) - sorted with multiple same selections',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        skin={SimpleAutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={SimpleAutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions - isOpeningUpward',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        className={styles.customMargin}
        isOpeningUpward
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={SimpleAutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions and regex that allows only letters',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={SimpleAutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  );

// .add('Enter mnemonics in Modal', () => (
//   <Modal
//     isOpen
//     triggerCloseOnOverlayClick={false}
//     skin={<SimpleModalSkin />}
//   >
//     <div className={styles.dialogWrapper}>
//       <div className={styles.title}>
//         <h1>Autocomplete in Modal</h1>
//       </div>
//       <div className={styles.content}>
//         <Autocomplete
//           label="Recovery phrase"
//           placeholder="Enter recovery phrase"
//           options={OPTIONS}
//           maxSelections={12}
//           maxVisibleOptions={5}
//           invalidCharsRegex= {/[^a-zA-Z]/g}
//           skin={<SimpleAutocompleteSkin />}
//         />
//       </div>
//       <div className={styles.actions}>
//         <Button
//           className='primary'
//           label='Submit'
//           skin={<SimpleButtonSkin />}
//         />
//       </div>
//     </div>
//   </Modal>
// ))
