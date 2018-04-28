import React from 'react';
import classnames from 'classnames';
// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Autocomplete, Modal, Button } from '../source/components';

// skins
import {
  AutocompleteSkin,
  ModalSkin,
  ButtonSkin
} from '../source/skins/simple';

// themes
import CustomAutocompleteTheme from './theme-customizations/Autocomplete.custom.scss';

// custom styles & theme overrides
import styles from './Autocomplete.stories.scss';
import themeOverrides from './theme-overrides/customAutocomplete.scss';
import trashIcon from './images/trash-icon.png';

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
  // ====== Stories ======

  .add('Enter mnemonics - plain', () => (
    <Autocomplete skin={AutocompleteSkin} />
  ))

  .add('Enter mnemonics - label', () => (
    <Autocomplete label="Recovery phrase" skin={AutocompleteSkin} />
  ))

  .add('Enter mnemonics - placeholder', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      skin={AutocompleteSkin}
    />
  ))

  .add('Enter mnemonics - error', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      error="Please enter mnemonics in right order"
      skin={AutocompleteSkin}
    />
  ))

  .add('(9-word mnemonic) - not sorted',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        sortAlphabetically={false}
        multipleSameSelections={false}
        maxSelections={9}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('(9-word mnemonic) - sorted with multiple same selections',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('(12-word mnemonic) 5 suggestions',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('(12-word mnemonic) 5 suggestions - isOpeningUpward',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        className={styles.customMargin}
        isOpeningUpward
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('(12-word mnemonic) 5 suggestions and regex that allows only letters',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('Enter mnemonics in Modal',
    withState({ isOpen: true, selectedOpts: [] }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick={false}
        skin={ModalSkin}
      >
        <div className={styles.dialogWrapper}>
          <div className={styles.title}>
            <h1>Autocomplete in Modal</h1>
          </div>
          <div className={styles.content}>
            <Autocomplete
              label="Recovery phrase"
              placeholder="Enter recovery phrase"
              options={OPTIONS}
              maxSelections={12}
              maxVisibleOptions={5}
              invalidCharsRegex={/[^a-zA-Z]/g}
              skin={AutocompleteSkin}
              onChange={selectedOpts => store.set({ selectedOpts })}
            />
          </div>
          <div className={styles.actions}>
            <Button
              onClick={() => store.set({ isOpen: false })}
              className="primary"
              label="Submit"
              skin={ButtonSkin}
            />
          </div>
        </div>
      </Modal>
    ))
  )

  .add('Clear value on click', () => {
    const autocompleteRef = React.createRef();
    return (
      <div>
        <Autocomplete
          ref={autocompleteRef}
          label="Recovery phrase"
          options={OPTIONS}
          placeholder="Enter mnemonic..."
          skin={AutocompleteSkin}
        />
        <button onClick={() => autocompleteRef.current.clear()}>clear</button>
      </div>
    );
  })
  /*eslint-disable */
  .add('Render prop - renderSelections',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        sortAlphabetically={false}
        multipleSameSelections={false}
        maxSelections={7}
        maxVisibleOptions={7}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
        renderSelections={getSelectionProps => {
          const {
            inputValue,
            isOpen,
            selectedOptions,
            theme,
            removeSelection
          } = getSelectionProps({
            removeSelection: index =>
              console.log(`You removed: ${selectedOptions[index]}`)
          });

          return selectedOptions.map((option, index) => (
            <span className={theme.selectedWordBox} key={index}>
              <span style={{ color: '#fff', margin: '2px 5px 0 0' }}>
                {option}
              </span>

              <span
                role="presentation"
                aria-hidden
                style={{ cursor: 'pointer' }}
                onClick={removeSelection.bind(null, index)}
              >
                <img width="20px" height="20px" src={trashIcon} />
              </span>
            </span>
          ));
        }}
      />
    ))
  )

  .add('Render prop - renderOptions',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Select an Option Multiple Times"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        sortAlphabetically
        multipleSameSelections
        maxSelections={10}
        maxVisibleOptions={7}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
        renderOptions={getOptionProps => {
          const {
            options,
            selectedOptions,
            isOpen,
            isHighlightedOption,
            isDisabledOption,
            theme,
            onClick,
            onMouseEnter
          } = getOptionProps({
            onClick: (option, event) => console.log(`You clicked "${option}"`),
            onMouseEnter: (index, event) =>
              console.log(`Mouse is on "${options[index]}"`)
          });

          return options.map((option, index) => {
            // calculates number of times the option
            // has been selected already
            const timesSelected = selectedOptions.filter(
              selectedOpt => selectedOpt === option
            ).length;

            return (
              <li
                role="presentation"
                aria-hidden
                key={index}
                className={classnames([
                  theme.option,
                  isHighlightedOption(index)
                    ? themeOverrides.customHighlight
                    : null,
                  option.isDisabled ? theme.disabledOption : null
                ])}
                onMouseEnter={onMouseEnter.bind(null, index)}
                onClick={onClick.bind(null, option)}
              >
                <span>{option}</span>
                {timesSelected ? (
                  <span
                    style={{
                      fontStyle: 'italic',
                      fontSize: '12px',
                      marginLeft: '1rem'
                    }}
                  >
                    {`times selected: ${timesSelected}`}
                  </span>
                ) : null}
              </li>
            );
          });
        }}
      />
    ))
  )
  /*eslint-disable */
  .add('theme overrides',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        themeOverrides={themeOverrides}
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add('custom theme',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        theme={CustomAutocompleteTheme}
        label="Custom Autocomplete theme"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  );
