import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Button from '../source/components/Button';

// skins
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';

// themes
import { SimpleButtonTheme } from '../source/themes/simple';

// custom styles
import customButton from './styles/customButton.scss';

storiesOf('Button', module)
  .addDecorator(story => {
    const SimpleTheme = { button: { ...SimpleButtonTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
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
