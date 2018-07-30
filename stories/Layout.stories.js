// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Flex } from '../source/components/layout/Flex';
import { FlexItem } from '../source/components/layout/FlexItem';

// styles && themeOverrides
import styles from './Layout.stories.scss';
import customFlex from './theme-overrides/customFlex.scss';

// decorator
import { decorateWithSimpleTheme } from './helpers/theming';

const { wrapper } = styles;

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
  ));
