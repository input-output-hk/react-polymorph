import React from "react";

// storybook
import { storiesOf } from "@storybook/react";

// components
import { ThemeProvider, Button } from "../source/components";

// skins
import { ButtonSkin } from "../source/skins/simple";

// themes
import { ButtonTheme } from "../source/themes/simple";

// custom styles & themeOverrides
import themeOverrides from "./styles/customButton.scss";

storiesOf("Button", module)
  .addDecorator(story => {
    const SimpleTheme = { button: { ...ButtonTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add("plain", () => <Button label="Button label" skin={ButtonSkin} />)

  .add("disabled", () => (
    <Button disabled label="Button label" skin={ButtonSkin} />
  ))

  // the user can pass themeOverrides to ThemeProvider and have all buttons
  // reflect a custom theme or pass it directly to one instance of Button
  .add("composed theme", () => (
    <Button
      label="Button label"
      themeOverrides={themeOverrides}
      skin={ButtonSkin}
    />
  ));
