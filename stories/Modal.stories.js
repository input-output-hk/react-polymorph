import React from "react";

// storybook
import { storiesOf } from "@storybook/react";
import { withState } from "@dump247/storybook-state";

// components
import { ThemeProvider, Modal, Button } from "../source/components";

// skins
import { ModalSkin, ButtonSkin } from "../source/skins/simple";

// themes
import SimpleTheme from "../source/themes/simple";
import CustomModalTheme from "./theme-customizations/Modal.custom.scss";

// custom styles & themeOverrides
import styles from "./Modal.stories.scss";
import themeOverrides from "./theme-overrides/customModal.scss";
import { IDENTIFIERS } from '../source/themes/API';

storiesOf("Modal", module)
  .addDecorator(story => {
    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('cancelable via overlay', withState({ isOpen: true }, store => (
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

  .add('cancelable via buttons', withState({ isOpen: true }, store => (
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

  .add('theme overrides', withState({ isOpen: true }, store => (
      <Modal
        themeOverrides={{ [IDENTIFIERS.MODAL]: themeOverrides }}
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={ModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  )

  .add('custom theme', withState({ isOpen: true }, store => (
      <Modal
        theme={{ [IDENTIFIERS.MODAL]: CustomModalTheme }}
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={ModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  );
