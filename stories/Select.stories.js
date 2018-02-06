import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Select from '../source/components/Select';
import FormField from '../source/components/FormField';

// skins
import SimpleSelectSkin from '../source/skins/simple/SelectSkin';
import SimpleFormFieldSkin from '../source/skins/simple/FormFieldSkin';

// themes
import {
  SimpleSelectTheme,
  SimpleFormFieldTheme
} from '../source/themes/simple';

// custom styles & themeOverrides
import styles from './Select.stories.scss';
import themeOverrides from './styles/customSelect.scss';

// images
import flagEngland from './images/gb.png';
import flagSpain from './images/es.png';
import flagThailand from './images/th.png';
import flagUSA from './images/us.png';

// constants
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
  .addDecorator(story => {
    const SimpleTheme = {
      select: { ...SimpleSelectTheme },
      formfield: { ...SimpleFormFieldTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'Countries - options',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'Countries - label',
    withState({ value: '' }, store => (
      <FormField
        label="Some label"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Select
            value={store.state.value}
            onChange={value => store.set({ value })}
            label="Countries"
            options={COUNTRIES}
            skin={SimpleSelectSkin}
          />
        )}
      />
    ))
  )

  .add(
    'Countries - placeholder',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        placeholder="Select your country …"
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'Countries - value',
    withState({ value: COUNTRIES[0].value }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES}
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'Countries - error',
    withState({ value: COUNTRIES[0].value }, store => (
      <FormField
        label="Countries"
        error="You picked the wrong country"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Select
            {...props}
            value={store.state.value}
            onChange={value => store.set({ value })}
            options={COUNTRIES}
            skin={SimpleSelectSkin}
          />
        )}
      />
    ))
  )

  .add(
    'Countries - custom options template',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        options={COUNTRIES_WITH_FLAGS}
        optionRenderer={option => {
          return (
            <div className={styles.customOption}>
              <img src={option.flag} />
              <span>{option.label}</span>
            </div>
          );
        }}
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'Countries - isOpeningUpward',
    withState({ value: '' }, store => (
      <FormField
        className={styles.customMargin}
        label="Countries (opening upward)"
        skin={SimpleFormFieldSkin}
        render={props => (
          <Select
            value={store.state.value}
            onChange={value => store.set({ value })}
            options={COUNTRIES}
            placeholder="Select your country …"
            skin={SimpleSelectSkin}
            isOpeningUpward
          />
        )}
      />
    ))
  )

  .add(
    'Countries - with disabled options',
    withState({ value: '' }, store => (
      <Select
        value={store.state.value}
        onChange={value => store.set({ value })}
        label="Countries (has disabled options)"
        options={COUNTRIES_WITH_DISABLED_OPTIONS}
        placeholder="Select your country …"
        skin={SimpleSelectSkin}
      />
    ))
  )

  .add(
    'composed theme',
    withState({ value: '' }, store => (
      <Select
        themeOverrides={themeOverrides}
        value={store.state.value}
        onChange={value => store.set({ value })}
        label="Select with a composed theme"
        options={COUNTRIES}
        placeholder="Select your country …"
        skin={SimpleSelectSkin}
      />
    ))
  );
