// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Flex } from '../source/components/layout/Flex';

// styles
import styles from './Layout.stories.scss';

storiesOf('Layout', module)
  // ====== Layout Stories ======

  .add('Flex - column center', () => (
    <Flex column center className={styles.wrapper}>
      <h1>Flex Item 1</h1>
      <h1>Flex Item 2</h1>
      <h1>Flex Item 3</h1>
    </Flex>
  ))

  .add('Flex - row center', () => (
    <Flex row center className={styles.wrapper}>
      <h1>Flex Item 1</h1>
      <h1>Flex Item 2</h1>
      <h1>Flex Item 3</h1>
    </Flex>
  ))

  .add('Flex - columnReverse center', () => (
    <Flex columnReverse center className={styles.wrapper}>
      <h1>Flex Item 1</h1>
      <h1>Flex Item 2</h1>
      <h1>Flex Item 3</h1>
    </Flex>
  ))

  .add('Flex - rowReverse center', () => (
    <Flex rowReverse center className={styles.wrapper}>
      <h1>Flex Item 1</h1>
      <h1>Flex Item 2</h1>
      <h1>Flex Item 3</h1>
    </Flex>
  ))

  .add('Flex - justifyContent="space-around"', () => (
    <Flex
      row
      justifyContent="space-around"
      alignItems="center"
      className={styles.wrapper}
    >
      <h1>Flex Item 1</h1>
      <h1>Flex Item 2</h1>
      <h1>Flex Item 3</h1>
    </Flex>
  ));
