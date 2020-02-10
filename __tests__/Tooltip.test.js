import React from 'react';

import { renderInSimpleTheme } from './helpers/theming';
import { Tooltip } from '../source/components/Tooltip';
import styles from '../stories/Tooltip.stories.scss';

test('tooltip plain', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      isVisible
      tip="plain tooltip, nothing special about me">
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip with html', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      isVisible
      tip={
        <div>
          I can use <span className={styles.htmlTip}>HTML</span>
        </div>
      }>
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isAligningRight', () => {
  expect(renderInSimpleTheme(
    <Tooltip isAligningRight tip="I am aligning right">
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isBounded', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      isBounded
      tip="Help, I am stuck in this small box"
    >
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip with custom class', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      className={styles.customTooltip}
      tip="How did I get all the way over here?"
    >
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isOpeningUpward={false}', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      isOpeningUpward={false}
      tip="I come from a land down under"
    >
      hover over me
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip arrowRelativeToTip', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      arrowRelativeToTip
      tip="small tip"
    >
      {'this is a really long string for demonstration purposes'}
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip arrowRelativeToTip (below)', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      arrowRelativeToTip
      isOpeningUpward={false}
      tip="small tip from below"
    >
      {'this is a really long string for demonstration purposes'}
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isCentered', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      arrowRelativeToTip
      isCentered
      tip="centered above"
    >
      {'this is a really long string for demonstration purposes'}
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isCentered (below)', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      arrowRelativeToTip
      isCentered
      isOpeningUpward={false}
      tip="centered below"
    >
      {'this is a really long string for demonstration purposes'}
    </Tooltip>
  )).toMatchSnapshot();
});

test('tooltip isCentered (below)', () => {
  expect(renderInSimpleTheme(
    <Tooltip
      arrowRelativeToTip
      isCentered
      isOpeningUpward={false}
      tip="centered below"
    >
      {'this is a really long string for demonstration purposes'}
    </Tooltip>
  )).toMatchSnapshot();
});
