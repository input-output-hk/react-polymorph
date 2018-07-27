// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Flex } from '../source/components/layout/Flex';

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

  .add('Flex - justifyContent="space-between"', () => (
    <Flex
      row
      justifyContent="space-between"
      alignItems="center"
      className={wrapper}
    >
      <Flex.Item>FlexItem 1</Flex.Item>
      <Flex.Item>FlexItem 2</Flex.Item>
      <Flex.Item>FlexItem 3</Flex.Item>
    </Flex>
  ))

  .add('Flex - themeOverrides', () => (
    <Flex
      row
      justifyContent="space-between"
      alignItems="center"
      themeOverrides={customFlex}
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

  .add('Flex.Item - flex', () => (
    <Flex row center className={wrapper}>
      <Flex.Item flex={1}>flex = 1</Flex.Item>
      <Flex.Item flex={2}>flex = 2</Flex.Item>
      <Flex.Item flex={3}>flex = 3</Flex.Item>
      <Flex.Item flex={4}>flex = 4</Flex.Item>
      <Flex.Item flex={5}>flex = 5</Flex.Item>
    </Flex>
  ));
