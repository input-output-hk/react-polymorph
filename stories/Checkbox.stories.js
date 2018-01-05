import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Checkbox from '../source/components/Checkbox';
import SimpleCheckboxSkin from '../source/skins/simple/CheckboxSkin';
import simple from '../source/themes/simple/SimpleCheckbox.scss';
import customCheckbox from './styles/customCheckbox.scss';

storiesOf('Checkbox', module)
  .addDecorator(story => {
    const onChangeAction = action('onChange');
    const state = observable({
      checked: false,
      onChange: mobxAction((value, event) => {
        state.checked = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Checkbox skin={SimpleCheckboxSkin} theme={simple} />)

  .add('disabled', () => (
    <Checkbox disabled skin={SimpleCheckboxSkin} theme={simple} />
  ))

  .add('short label', () => (
    <Checkbox label="My checkbox" skin={SimpleCheckboxSkin} theme={simple} />
  ))

  .add('disabled with label', () => (
    <Checkbox
      disabled
      label="My checkbox"
      skin={SimpleCheckboxSkin}
      theme={simple}
    />
  ))

  .add('long label', () => (
    <Checkbox
      skin={SimpleCheckboxSkin}
      label="I understand that if this application is moved to another device or deleted,
             my money can be only recovered with the backup phrase which
             were written down in a secure place"
      theme={simple}
    />
  ))

  .add('html label', () => (
    <Checkbox
      skin={SimpleCheckboxSkin}
      label={
        <div>
          Example for a <strong>bold</strong> word in an html label
        </div>
      }
      theme={simple}
    />
  ))

  .add('with custom styles', () => (
    <Checkbox
      skin={SimpleCheckboxSkin}
      label="check here"
      theme={simple}
      themeOverrides={customCheckbox}
    />
  ));
