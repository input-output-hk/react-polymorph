import React from "react";

// storybook
import { storiesOf } from "@storybook/react";
import { withState } from "@dump247/storybook-state";

// components
import { ThemeProvider, Radio } from "../source/components";

// skins
import { RadioSkin } from "../source/skins/simple";

// themes
import { RadioTheme } from "../source/themes/simple";

// custom styles & themeOverrides
import styles from "./Radio.stories.scss";
import themeOverrides from "./styles/customRadio.scss";

storiesOf("Radio", module)
  .addDecorator(story => {
    const SimpleTheme = { radio: { ...RadioTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    "plain",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
        />
      </div>
    ))
  )

  .add(
    "disabled",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio disabled skin={RadioSkin} />
      </div>
    ))
  )

  .add(
    "short label",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          label="My radio"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
        />
      </div>
    ))
  )

  .add(
    "custom className",
    withState({ selected: false }, store => (
      <Radio
        className={styles.padding}
        selected={store.state.selected}
        onChange={() => store.set({ selected: !store.state.selected })}
        skin={RadioSkin}
      />
    ))
  )

  .add(
    "disabled with label",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          disabled
          label="My radio"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
        />
      </div>
    ))
  )

  .add(
    "long label",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          label="I understand that if this application is moved to another device or deleted,
                 my money can be only recovered with the backup phrase which
                 were written down in a secure place"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
        />
      </div>
    ))
  )

  .add(
    "html label",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
          label={
            <div>
              Example for a <strong>bold</strong> word in an html label
            </div>
          }
        />
      </div>
    ))
  )

  .add(
    "composed theme",
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          themeOverrides={themeOverrides}
          label="Radio with a composed theme"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={RadioSkin}
        />
      </div>
    ))
  );
