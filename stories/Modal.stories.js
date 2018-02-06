import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Modal from '../source/components/Modal';
import Button from '../source/components/Button';

// skins
import SimpleModalSkin from '../source/skins/simple/ModalSkin';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';

// themes
import { SimpleModalTheme, SimpleButtonTheme } from '../source/themes/simple';

// custom styles & themeOverrides
import styles from './Modal.stories.scss';
import themeOverrides from './styles/customModal.scss';

storiesOf('Modal', module)
  .addDecorator(story => {
    const SimpleTheme = {
      modal: { ...SimpleModalTheme },
      button: { ...SimpleButtonTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'cancelable via overlay',
    withState({ isOpen: true }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={SimpleModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  )

  .add(
    'cancelable via buttons',
    withState({ isOpen: true }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick={false}
        skin={SimpleModalSkin}
      >
        <h1 className={styles.modalTitle}>
          Are you sure you want to delete this thing?
        </h1>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.cancelButton}
            label="Cancel"
            onClick={() => store.set({ isOpen: !store.state.isOpen })}
            skin={SimpleButtonSkin}
          />
          <Button
            className={styles.deleteButton}
            label="Delete"
            onClick={() => store.set({ isOpen: !store.state.isOpen })}
            skin={SimpleButtonSkin}
          />
        </div>
      </Modal>
    ))
  )

  .add(
    'composed theme',
    withState({ isOpen: true }, store => (
      <Modal
        themeOverrides={themeOverrides}
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick
        onClose={() => store.set({ isOpen: !store.state.isOpen })}
        skin={SimpleModalSkin}
      >
        <h1 className={styles.modalTitle}>Click outside of modal to cancel</h1>
      </Modal>
    ))
  );
