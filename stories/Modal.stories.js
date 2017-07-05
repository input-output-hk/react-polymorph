import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Modal from '../source/components/Modal';
import Button from '../source/components/Button';
import SimpleModalSkin from '../source/skins/simple/ModalSkin';
import SimpleButtonSkin from '../source/skins/simple/ButtonSkin';
import styles from './Modal.stories.scss';

let state;
const closeModal = mobxAction(() => { state.isOpen = false; });

storiesOf('Modal', module)

  .addDecorator((story) => {
    state = observable({
      isOpen: true,
      contentLabel: "Example Modal",
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('cancelable via overlay', () => (
    <Modal
      triggerCloseOnOverlayClick
      onClose={closeModal}
      skin={<SimpleModalSkin />}
    >
      <h1 className={styles.modalTitle}>
        Click outside of modal to cancel
      </h1>
    </Modal>
  ))

  .add('cancelable via buttons', () => (
    <Modal
      triggerCloseOnOverlayClick={false}
      skin={<SimpleModalSkin />}
    >
      <h1 className={styles.modalTitle}>
        Are you sure you want to delete this thing?
      </h1>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.cancelButton}
          label="Cancel"
          onClick={closeModal}
          skin={<SimpleButtonSkin />}
        />
        <Button
          className={styles.deleteButton}
          label="Delete"
          onClick={closeModal}
          skin={<SimpleButtonSkin />}
        />
      </div>
    </Modal>
  ));
