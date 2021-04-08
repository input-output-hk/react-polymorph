// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withKnobs, boolean } from '@storybook/addon-knobs';
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
import {
  WALLETS,
  COUNTRIES,
  COUNTRIES_WITH_FLAGS,
  COUNTRIES_WITH_DISABLED_OPTIONS,
  COUNTRIES_LONG_LIST,
} from './helpers/dummyData';


storiesOf('Select', module)

  .addDecorator(decorateWithSimpleTheme)
  .addDecorator(withKnobs)

  // ====== Stories ======

  .add('options',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        hasSearch={boolean('hasSearch', true)}
      />
    ))
  )

  .add('label',
    withState({ value: '' }, store => (
      <Select
        label="Select a country"
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={boolean('Long list?') ? COUNTRIES_LONG_LIST : COUNTRIES}
        hasSearch={boolean('hasSearch')}
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
        hasSearch={boolean('hasSearch')}
      />
    ))
  )

  .add('value',
    withState({ value: COUNTRIES[0].value }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        hasSearch={boolean('hasSearch')}
      />
    ))
  )

  .add('with search and long list',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES_LONG_LIST}
        hasSearch
      />
    ))
  )

  .add('with custom search and escaped value',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={[
          {
            label: 'Escaped values: /.*+?|,()[]{}\\'
          },
          ...COUNTRIES
        ]}
        hasSearch
        onSearch={(searchValue: string, list: Array<any>) => {
          const regex = new RegExp(searchValue, "i");
          return list
            .filter((option) => {
              const { label, value } = option;
              const regex = new RegExp(searchValue, "i");
              return regex.test(label) || regex.test(value);
            })
            .map((option) => {
              const { label, value } = option;
              return {
                value,
                label: `${label} (${value})`,
              };
            });
        }}
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
        hasSearch={boolean('hasSearch')}
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
        optionHeight={56}
        hasSearch={boolean('hasSearch')}
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
        hasSearch={boolean('hasSearch')}
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
        hasSearch={boolean('hasSearch')}
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
          hasSearch={boolean('hasSearch')}
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
        hasSearch={boolean('hasSearch')}
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
                  options={COUNTRIES_LONG_LIST}
                  hasSearch={boolean('hasSearch')}
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
  )

  .add('custom selected option renderer',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        placeholder="Select Wallet"
        options={WALLETS}
        optionRenderer={option => (
          <div
            className={styles.customOptionStyle}
            role="presentation"
          >
            <div className={styles.label}>{option.label}</div>
            <div className={styles.value}>{option.value}</div>
          </div>
        )}
        selectionRenderer={option => (
          <div className={styles.customValueStyle}>
            <div className={styles.label}>{option.label}</div>
            <div className={styles.value}>{option.value}</div>
          </div>
        )}
        optionHeight={63}
        hasSearch={boolean('hasSearch')}
      />
    ))
  );
