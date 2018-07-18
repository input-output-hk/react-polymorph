// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Flex } from '../source/components/layout/Flex';
import { Grid } from '../source/components/layout/Grid';
import { Gutter } from '../source/components/layout/Gutter';

// styles
import styles from './Layout.stories.scss';

const { wrapper, header, main, aside, footer, box } = styles;

storiesOf('Layout', module)
  // ====== Layout Stories ======

  .add('Flex - column center', () => (
    <Flex column center className={wrapper}>
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex - row center', () => (
    <Flex row center className={wrapper}>
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex - columnReverse', () => (
    <Flex columnReverse center className={wrapper}>
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex - rowReverse', () => (
    <Flex rowReverse center className={wrapper}>
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex - justifyContent="space-around"', () => (
    <Flex
      row
      justifyContent="space-around"
      alignItems="center"
      className={wrapper}
    >
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex.Item - alignSelf="flex-start"', () => (
    <Flex row center className={wrapper}>
      <Flex.Item alignSelf="flex-start">FlexItem 1</Flex.Item>
      <Flex.Item alignSelf="flex-end">FlexItem 2</Flex.Item>
      <Flex.Item alignSelf="flex-start">FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex.Item - alignSelf="stretch"', () => (
    <Flex row center className={wrapper}>
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item alignSelf="stretch">FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex.Item - order', () => (
    <Flex row center className={wrapper}>
      <Flex.Item order={2}>FlexItem 1</Flex.Item>
      <Flex.Item order={3}>FlexItem 2</Flex.Item>
      <Flex.Item order={1}>FlexItem 3</Flex.Item>
      <Flex.Item order={5}>FlexItem 4</Flex.Item>
      <Flex.Item order={4}>FlexItem 5</Flex.Item>
    </Flex>
  ))

  .add('Grid - simple', () => (
    <Gutter>
      <Grid columns="75% 25%" rows="10vw 30vw 10vw" gap="1em">
        <div className={header}>header</div>
        <div className={main}>main</div>
        <div className={aside}>aside</div>
        <div className={footer}>footer</div>
      </Grid>
    </Gutter>
  ))

  .add('Grid - even', () => (
    <Gutter>
      <Grid
        columns="repeat(auto-fill, minmax(200px, 1fr))"
        autoRows="minmax(150px, auto)"
        gap="1em"
      >
        <div className={box}>1</div>
        <div className={box}>2</div>
        <div className={box}>3</div>
        <div className={box}>4</div>
        <div className={box}>5</div>
        <div className={box}>6</div>
        <div className={box}>7</div>
        <div className={box}>8</div>
        <div className={box}>9</div>
        <div className={box}>10</div>
        <div className={box}>11</div>
        <div className={box}>12</div>
        <div className={box}>13</div>
        <div className={box}>14</div>
        <div className={box}>15</div>
      </Grid>
    </Gutter>
  ));
