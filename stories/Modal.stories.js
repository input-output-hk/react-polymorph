import React from 'react';

import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import ThemeProvider from '../source/components/ThemeProvider';

import Modal from '../source/components/Modal';
import SimpleModalSkin from '../source/skins/simple/ModalSkin';
import simpleModal from '../source/themes/simple/SimpleModal.scss';

import Button from '../source/components/Button';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';
import simpleButton from '../source/themes/simple/SimpleButton.scss';

import styles from './Modal.stories.scss';

storiesOf('Modal', module)
  .addDecorator(story => {
    const SimpleTheme = {
      modal: { ...simpleModal },
      button: { ...simpleButton }
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
  );
