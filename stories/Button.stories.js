import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';

import ThemeProvider from '../source/components/ThemeProvider';

import Button from '../source/components/Button';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';
import simpleButton from '../source/themes/simple/SimpleButton.scss';
import customButton from './styles/customButton.scss';

storiesOf('Button', module)
  .addDecorator(story => {
    const simpleButtonTheme = { button: { ...simpleButton } };

    return <ThemeProvider theme={simpleButtonTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('plain', () => <Button label="Button label" skin={SimpleButtonSkin} />)

  .add('disabled', () => (
    <Button disabled label="Button label" skin={SimpleButtonSkin} />
  ))

  // the user can pass themeOverrides to ThemeProvider and have all buttons
  // reflect a custom theme or pass it directly to one instance of Button
  .add('composed theme', () => (
    <Button
      label="Button label"
      themeOverrides={customButton}
      skin={SimpleButtonSkin}
    />
  ));
