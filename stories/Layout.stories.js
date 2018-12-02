// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Flex } from '../source/components/layout/Flex';
import { FlexItem } from '../source/components/layout/FlexItem';
import { Grid } from '../source/components/layout/Grid';
import { GridItem } from '../source/components/layout/GridItem';
import { Gutter } from '../source/components/layout/Gutter';
import { Header } from '../source/components/Header';

// styles && themeOverrides
import styles from './Layout.stories.scss';
import customFlex from './theme-overrides/customFlex.scss';
import customGrid from './theme-overrides/customGrid.scss';

// decorator
import { decorateWithSimpleTheme } from './helpers/theming';

const { wrapper, header, main, aside, footer, tomato, boxDark, boxLight, boxPastel } = styles;

storiesOf('Layout', module)

  // wraps all stories in ThemeProvider, passes theme via context
  .addDecorator(decorateWithSimpleTheme)

  .add('Flex - column center', () => (
    <Flex column center className={wrapper}>
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - row center', () => (
    <Flex row center className={wrapper}>
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - columnReverse', () => (
    <Flex columnReverse center className={wrapper}>
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - rowReverse', () => (
    <Flex rowReverse center className={wrapper}>
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - justifyContent="space-around"', () => (
    <Flex
      row
      justifyContent="space-around"
      alignItems="center"
      className={wrapper}
    >
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - justifyContent="space-between"', () => (
    <Flex
      row
      justifyContent="space-between"
      alignItems="center"
      className={wrapper}
    >
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('Flex - themeOverrides', () => (
    <Flex
      row
      justifyContent="space-between"
      alignItems="center"
      themeOverrides={customFlex}
    >
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem>FlexItem 2</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('FlexItem - alignSelf="flex-start / end"', () => (
    <Flex row center className={wrapper}>
      <FlexItem alignSelf="flex-start">flex-start</FlexItem>
      <FlexItem alignSelf="flex-end">flex-end</FlexItem>
      <FlexItem alignSelf="flex-start">flex-start</FlexItem>
    </Flex>
  ))

  .add('FlexItem - alignSelf="stretch"', () => (
    <Flex row center className={wrapper}>
      <FlexItem>FlexItem 1</FlexItem>
      <FlexItem alignSelf="stretch">stretch</FlexItem>
      <FlexItem>FlexItem 3</FlexItem>
    </Flex>
  ))

  .add('FlexItem - order', () => (
    <Flex row center className={wrapper}>
      <FlexItem order={2}>FlexItem 1</FlexItem>
      <FlexItem order={3}>FlexItem 2</FlexItem>
      <FlexItem order={1}>FlexItem 3</FlexItem>
      <FlexItem order={5}>FlexItem 4</FlexItem>
      <FlexItem order={4}>FlexItem 5</FlexItem>
    </Flex>
  ))

  .add('FlexItem - flex', () => (
    <Flex row center className={wrapper}>
      <FlexItem flex={1}>flex = 1</FlexItem>
      <FlexItem flex={2}>flex = 2</FlexItem>
      <FlexItem flex={3}>flex = 3</FlexItem>
      <FlexItem flex={4}>flex = 4</FlexItem>
      <FlexItem flex={5}>flex = 5</FlexItem>
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
    <Gutter padding="25vh 25vw">
      <Grid
        className={boxPastel}
        columns="200px 200px 200px"
        rows="125px 125px 125px"
        gap={40}
      >
        <GridItem column="1 / 3" row="1">
          1
        </GridItem>
        <GridItem column="3" row="1 / 3">
          2
        </GridItem>
        <GridItem column="1" row="2">
          3
        </GridItem>
        <GridItem column="2" row="2">
          4
        </GridItem>
      </Grid>
    </Gutter>
  ))

  .add('Grid.Item - columnStart/End rowStart/End', () => (
    <Gutter padding="25vh 25vw">
      <Grid className={boxLight} columns="repeat(3, 200px)" rows="repeat(3, 125px)" gap={10}>
        <GridItem columnStart={2} columnEnd={3} rowStart={1}>
          1
        </GridItem>
        <GridItem columnStart={3} rowStart={1} rowEnd={2}>
          2
        </GridItem>
        <GridItem columnStart={1} rowStart={1} rowEnd={3}>
          3
        </GridItem>
        <GridItem columnStart={2} columnEnd={4} rowStart={2}>
          4
        </GridItem>
      </Grid>
    </Gutter>
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
          <GridItem gridArea="content">content</GridItem>
          <GridItem gridArea="sidebar">sidebar</GridItem>
          <GridItem gridArea="header">header</GridItem>
          <GridItem gridArea="footer">footer</GridItem>
        </Grid>
      </Gutter>
    );
  })

  .add('Grid - themeOverrides', () => {
    const templateAreas = [
      'sidebar header header header',
      'sidebar content content aside',
      'sidebar content content aside',
      'sidebar footer footer footer'
    ];
    return (
      <Gutter padding="25vh 20vw">
        <Grid
          themeOverrides={customGrid}
          template="repeat(4, 1fr) / repeat(4, 1fr)"
          templateAreas={templateAreas}
          gap={10}
        >
          <GridItem gridArea="content">
            <Header h2 left>content</Header>
          </GridItem>

          <GridItem gridArea="sidebar">
            <Header h2 left>sidebar</Header>
          </GridItem>

          <GridItem gridArea="header">
            <Header h2 left>header</Header>
          </GridItem>

          <GridItem gridArea="footer">
            <Header h2 left>footer</Header>
          </GridItem>

          <GridItem gridArea="aside">
            <Header h2 left>aside</Header>
          </GridItem>
        </Grid>
      </Gutter>
    );
  });
