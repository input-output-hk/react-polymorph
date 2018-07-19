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

const { full, wrapper, header, main, aside, footer, tomato, boxDark, boxLight, boxPastel } = styles;

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
    <Gutter padding={60}>
      <Grid columns="75% 25%" rows="10vw 30vw 10vw" gap={30}>
        <div className={header}>header</div>
        <div className={main}>main</div>
        <div className={aside}>aside</div>
        <div className={footer}>footer</div>
      </Grid>
    </Gutter>
  ))

  .add('Grid - even', () => (
    <Gutter padding={30}>
      <Grid
        center
        className={tomato}
        columns="repeat(auto-fill, minmax(200px, 1fr))"
        autoRows="minmax(150px, auto)"
        gap="1em"
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
      </Grid>
    </Gutter>
  ))

  .add('Grid.Item - column & row', () => (
    <Flex className={full} column center>
      <Grid
        className={boxPastel}
        columns="200px 200px 200px"
        rows="125px 125px 125px"
        gap={40}
      >
        <Grid.Item column="1 / 3" row="1">
          1
        </Grid.Item>
        <Grid.Item column="3" row="1 / 3">
          2
        </Grid.Item>
        <Grid.Item column="1" row="2">
          3
        </Grid.Item>
        <Grid.Item column="2" row="2">
          4
        </Grid.Item>
      </Grid>
    </Flex>
  ))

  .add('Grid.Item - columnStart/End rowStart/End', () => (
    <Flex className={full} column center>
      <Grid className={boxLight} columns="repeat(3, 200px)" rows="repeat(3, 125px)" gap={10}>
        <Grid.Item columnStart={2} columnEnd={3} rowStart={1}>
          1
        </Grid.Item>
        <Grid.Item columnStart={3} rowStart={1} rowEnd={2}>
          2
        </Grid.Item>
        <Grid.Item columnStart={1} rowStart={1} rowEnd={3}>
          3
        </Grid.Item>
        <Grid.Item columnStart={2} columnEnd={4} rowStart={2}>
          4
        </Grid.Item>
      </Grid>
    </Flex>
  ))

  .add('Grid - template & templateAreas', () => {
    const templateAreas = [
      'header header header',
      'sidebar content content',
      'sidebar content content',
      'footer footer footer'
    ];
    return (
      <Gutter padding="25vh 20vw">
        <Grid
          className={boxDark}
          template="repeat(4, 1fr) / repeat(3, 1fr)"
          templateAreas={templateAreas}
          gap={10}
        >
          <Grid.Item gridArea="content">1</Grid.Item>
          <Grid.Item gridArea="sidebar">2</Grid.Item>
          <Grid.Item gridArea="header">3</Grid.Item>
          <Grid.Item gridArea="footer">4</Grid.Item>
        </Grid>
      </Gutter>
    );
  });
