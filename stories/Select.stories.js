// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { Select } from '../source/components/Select';
import { Modal } from '../source/components/Modal';
import { Button } from '../source/components/Button';

// themes
import { SimpleTheme } from '../source/themes/simple';
import CustomSelectTheme from './theme-customizations/Select.custom.scss';

// custom styles
import styles from './Select.stories.scss';

// images
import flagEngland from './images/gb.png';
import flagSpain from './images/es.png';
import flagThailand from './images/th.png';
import flagUSA from './images/us.png';

// constants
import { IDENTIFIERS } from '../source/components';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const COUNTRIES = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA' }
];

const COUNTRIES_WITH_FLAGS = [
  { value: 'EN-gb', label: 'England', flag: flagEngland },
  { value: 'ES-es', label: 'Spain', flag: flagSpain },
  { value: 'TH-th', label: 'Thailand', flag: flagThailand },
  { value: 'EN-en', label: 'USA', flag: flagUSA }
];

const COUNTRIES_WITH_DISABLED_OPTIONS = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand', isDisabled: true },
  { value: 'EN-en', label: 'USA' }
];

storiesOf('Select', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('options',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <Select
        label="Select a country"
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
      />
    ))
  )

  .add('placeholder',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        placeholder="Select your country …"
      />
    ))
  )

  .add('value',
    withState({ value: COUNTRIES[0].value }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
      />
    ))
  )

  .add('with error',
    withState({ value: COUNTRIES[0].value }, store => (
      <Select
        label="Countries"
        error="You picked the wrong country"
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
      />
    ))
  )

  .add('custom options template',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES_WITH_FLAGS}
        optionRenderer={option => (
          <div className={styles.customOption}>
            <img src={option.flag} />
            <span>{option.label}</span>
          </div>
          )}
      />
    ))
  )

  .add('isOpeningUpward',
    withState({ value: '' }, store => (
      <Select
        isOpeningUpward
        className={styles.customMargin}
        label="Countries (opening upward)"
        placeholder="Select your country …"
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
      />
    ))
  )

  .add('with disabled options',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        label="Countries (has disabled options)"
        options={COUNTRIES_WITH_DISABLED_OPTIONS}
        placeholder="Select your country …"
      />
    ))
  )

  .add('rtl support',
    withState({ value: COUNTRIES[0].value }, store => (
      <div dir="rtl">
        <Select
          value={store.state.value}
          onChange={value => store.set({ value })}
          options={COUNTRIES}
        />
      </div>
    ))
  )

  .add('custom theme',
    withState({ value: '' }, store => (
      <Select
        theme={{ ...SimpleTheme, [IDENTIFIERS.SELECT]: CustomSelectTheme }}
        value={store.state.value}
        onChange={value => store.set({ value })}
        label="Countries (has disabled options)"
        options={COUNTRIES_WITH_DISABLED_OPTIONS}
        placeholder="Select your country …"
      />
    ))
  )

  .add('inside a modal',
    withState({ isOpen: true, value: '' }, store => (
      store.state.isOpen
        ? (
          <Modal
            isOpen={store.state.isOpen}
            triggerCloseOnOverlayClick={false}
            onClose={() => store.set({ isOpen: false })}
          >
            <div className={styles.dialogWrapper}>
              <div className={styles.title}>
                <h1>Select in Modal</h1>
              </div>
              <div className={styles.content}>
                <Select
                  value={store.state.value}
                  onChange={value => store.set({ value })}
                  options={COUNTRIES}
                />
              </div>
              <div className={styles.actions}>
                <Button
                  onClick={() => store.set({ isOpen: false })}
                  className="primary"
                  label="Submit"
                />
              </div>
            </div>
          </Modal>
        )
        : (
          <button
            className={styles.reopenModal}
            onClick={() => store.set({ isOpen: !store.state.isOpen })}
          >
            Reopen modal
          </button>
        )
    ))
  );
