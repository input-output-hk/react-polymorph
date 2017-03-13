import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import SimpleThemeProvider from './support/SimpleThemeProvider';
import PropsObserver from './support/PropsObserver';
import Button from '../lib/components/Button';
import SimpleButtonSkin from '../lib/skins/simple/ButtonSkin';

storiesOf('Button', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      value: '',
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

  .add('plain', () => <Button label="Button label" skin={<SimpleButtonSkin />} />)
  .add('disabled', () => <Button label="Button label" disabled skin={<SimpleButtonSkin />} />);
