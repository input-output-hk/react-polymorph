import React from "react";

// storybook
import { storiesOf } from "@storybook/react";
import { withState } from "@dump247/storybook-state";

// components
import { ThemeProvider, Modal, Button } from "../source/components";

// skins
import { ModalSkin, ButtonSkin } from "../source/skins/simple";

// themes
import { ModalTheme, ButtonTheme } from "../source/themes/simple";

// custom styles & themeOverrides
import styles from "./Modal.stories.scss";
import themeOverrides from "./styles/customModal.scss";

storiesOf("Modal", module)
  .addDecorator(story => {
    const SimpleTheme = {
      modal: { ...ModalTheme },
      button: { ...ButtonTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    "cancelable via overlay",
    withState({ isOpen: true }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={ModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  )

  .add(
    "cancelable via buttons",
    withState({ isOpen: true }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick={false}
        skin={ModalSkin}
      >
        <h1 className={styles.modalTitle}>
          Are you sure you want to delete this thing?
        </h1>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.cancelButton}
            label="Cancel"
            onClick={() => store.set({ isOpen: !store.state.isOpen })}
            skin={ButtonSkin}
          />
          <Button
            className={styles.deleteButton}
            label="Delete"
            onClick={() => store.set({ isOpen: !store.state.isOpen })}
            skin={ButtonSkin}
          />
        </div>
      </Modal>
    ))
  )

  .add(
    "composed theme",
    withState({ isOpen: true }, store => (
      <Modal
        themeOverrides={themeOverrides}
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={ModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  );
