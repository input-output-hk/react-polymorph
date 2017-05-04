import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import SimpleThemeProvider from './support/SimpleThemeProvider';
import PropsObserver from './support/PropsObserver';
import Select from '../source/components/Select';
import SimpleSelectSkin from '../source/skins/simple/SelectSkin';

const COUNTRIES = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
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
    return (
      <SimpleThemeProvider>
        <PropsObserver propsForChildren={state}>
          {story(state)}
        </PropsObserver>
      </SimpleThemeProvider>
    );
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

  .add('Countries - isOpeningUpward', () => (
    <div style={{ marginTop: "183px" }}>
      <Select
        label="Countries (opening upward)"
        options={COUNTRIES}
        placeholder="Select your country …"
        skin={<SimpleSelectSkin />}
        isOpeningUpward
      />
    </div>
  ));
