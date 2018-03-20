import React from "react";

// storybook
import { storiesOf } from "@storybook/react";

// components
import { ThemeProvider, Button } from "../source/components";

// skins
import { ButtonSkin } from "../source/skins/simple";

// themes
import SimpleTheme from "../source/themes/simple";
import CustomButtonTheme from "./theme-customizations/Button.custom.scss";

// custom styles & themeOverrides
import themeOverrides from "./theme-overrides/customButton.scss";
import { IDENTIFIERS } from '../source/themes/API';

storiesOf("Button", module)

  .addDecorator(story => {
    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add("plain", () => <Button label="Button label" skin={ButtonSkin} />)

  .add("disabled", () => (
    <Button disabled label="Button label" skin={ButtonSkin} />
  ))

  .add("theme overrides", () => (
    <Button
      label="Composed theme"
      themeOverrides={{ [IDENTIFIERS.BUTTON]: themeOverrides }}
      skin={ButtonSkin}
    />
  ))

  .add("custom theme", () => (
    <Button
      label="Custom theme"
      theme={{ [IDENTIFIERS.BUTTON]: CustomButtonTheme }}
      skin={ButtonSkin}
    />
  ));
