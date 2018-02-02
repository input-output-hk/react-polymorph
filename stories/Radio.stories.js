import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import ThemeProvider from '../source/components/ThemeProvider';
import Radio from '../source/components/Radio';

// skins
import SimpleRadioSkin from '../source/skins/simple/RadioSkin';

// themes
import { SimpleRadioTheme } from '../source/themes/simple';

// custom styles
import styles from './Radio.stories.scss';

storiesOf('Radio', module)
  .addDecorator(story => {
    const SimpleTheme = { radio: { ...SimpleRadioTheme } };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add(
    'plain',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={SimpleRadioSkin}
        />
      </div>
    ))
  )

  .add(
    'disabled',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio disabled skin={SimpleRadioSkin} />
      </div>
    ))
  )

  .add(
    'short label',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          label="My radio"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={SimpleRadioSkin}
        />
      </div>
    ))
  )

  .add(
    'custom className',
    withState({ selected: false }, store => (
      <Radio
        className={styles.padding}
        selected={store.state.selected}
        onChange={() => store.set({ selected: !store.state.selected })}
        skin={SimpleRadioSkin}
      />
    ))
  )

  .add(
    'disabled with label',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          disabled
          label="My radio"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={SimpleRadioSkin}
        />
      </div>
    ))
  )

  .add(
    'long label',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          label="I understand that if this application is moved to another device or deleted,
                 my money can be only recovered with the backup phrase which
                 were written down in a secure place"
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={SimpleRadioSkin}
        />
      </div>
    ))
  )

  .add(
    'html label',
    withState({ selected: false }, store => (
      <div className={styles.container}>
        <Radio
          selected={store.state.selected}
          onChange={() => store.set({ selected: !store.state.selected })}
          skin={SimpleRadioSkin}
          label={
            <div>
              Example for a <strong>bold</strong> word in an html label
            </div>
          }
        />
      </div>
    ))
  );
