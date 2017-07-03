import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Checkbox from '../source/components/Checkbox';
import SimpleCheckboxSkin from '../source/skins/simple/CheckboxSkin';

storiesOf('Checkbox', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      checked: '',
      onChange: mobxAction((value, event) => {
        state.checked = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => <Checkbox skin={<SimpleCheckboxSkin />} />)

  .add('disabled', () => <Checkbox disabled skin={<SimpleCheckboxSkin />} />)

  .add('short label', () => <Checkbox label="My checkbox" skin={<SimpleCheckboxSkin />} />)

  .add('disabled with label', () => (
    <Checkbox
      disabled
      label="My checkbox"
      skin={<SimpleCheckboxSkin />}
    />
  ))

  .add('long label', () => (
    <Checkbox
      skin={<SimpleCheckboxSkin />}
      label="I understand that if this application is moved to another device or deleted,
             my money can be only recovered with the backup phrase which
             were written down in a secure place"
    />
  ));
