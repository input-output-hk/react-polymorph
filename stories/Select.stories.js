import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Select from '../source/components/Select';
import SimpleSelectSkin from '../source/skins/simple/SelectSkin';
import flagEngland from './images/gb.png';
import flagSpain from './images/es.png';
import flagThailand from './images/th.png';
import flagUSA from './images/us.png';
import styles from './Select.stories.scss';

const COUNTRIES = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

const COUNTRIES_WITH_FLAGS = [
  { value: 'EN-gb', label: 'England', flag: flagEngland },
  { value: 'ES-es', label: 'Spain', flag: flagSpain },
  { value: 'TH-th', label: 'Thailand', flag: flagThailand },
  { value: 'EN-en', label: 'USA', flag: flagUSA }
];

storiesOf('Select', module)

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

  .add('Countries - options', () => (
    <Select
      options={COUNTRIES}
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - label', () => (
    <Select
      label="Countries"
      options={COUNTRIES}
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - placeholder', () => (
    <Select
      label="Countries"
      options={COUNTRIES}
      placeholder="Select your country …"
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - value', () => (
    <Select
      label="Countries"
      options={COUNTRIES}
      value={COUNTRIES[0].value}
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - error', () => (
    <Select
      label="Countries"
      options={COUNTRIES}
      value={COUNTRIES[0].value}
      error="You picked the wrong country"
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - custom options template', () => (
    <Select
      label="Countries"
      options={COUNTRIES_WITH_FLAGS}
      optionRenderer={(option) => {
        return (
          <div className={styles.customOption}>
            <img src={option.flag} />
            <span>{option.label}</span>
          </div>
        );
      }}
      skin={<SimpleSelectSkin />}
    />
  ))

  .add('Countries - isOpeningUpward', () => (
    <div style={{ marginTop: 183 }}>
      <Select
        label="Countries (opening upward)"
        options={COUNTRIES}
        placeholder="Select your country …"
        skin={<SimpleSelectSkin />}
        isOpeningUpward
      />
    </div>
  ));
