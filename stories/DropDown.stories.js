import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import SimpleThemeProvider from './support/SimpleThemeProvider';
import PropsObserver from './support/PropsObserver';
import DropDown from '../source/components/DropDown';
import SimpleDropDownSkin from '../source/skins/simple/DropDownSkin';

const COUNTRIES = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

storiesOf('DropDown', module)

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
          {story()}
        </PropsObserver>
      </SimpleThemeProvider>
    );
  })

  // ====== Stories ======

  .add('Countries', () => (
    <DropDown
      label="Countries"
      options={COUNTRIES}
      skin={<SimpleDropDownSkin />}
    />
  ))

  .add('Countries - selected', () => (
    <DropDown
      label="Countries"
      options={COUNTRIES}
      value={COUNTRIES[0].value}
      skin={<SimpleDropDownSkin />}
    />
  ));
