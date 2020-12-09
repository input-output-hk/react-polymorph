// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { PopOver } from '../source/components/PopOver';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// custom styles & theme overrides
import styles from './PopOver.stories.scss';

storiesOf('PopOver', module)
  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======
  .add('default', () => (
    <div className={styles.container}>
      <PopOver content="opens downward because no space above">
        hover me
      </PopOver>
      <div style={{ marginTop: 20 }}>
        <PopOver content="opens upward because enough space above">
          Target with enough space above
        </PopOver>
      </div>
      <div style={{ marginTop: 20 }}>
        <PopOver placement="right" allowHTML content="right side<br/>multiline">
          Prefer placement on the right side
        </PopOver>
      </div>
      <div style={{ textAlign: 'right' }}>
        <PopOver placement="left" allowHTML content="left side<br/>multiline">
          Prefer placement on the left side
        </PopOver>
      </div>
    </div>
  ))

  .add('allowHTML', () => (
    <div className={styles.container}>
      <PopOver allowHTML content="this is a tip containing <b>HTML</b>">
        HTML tip
      </PopOver>
    </div>
  ))

  .add('content element', () => (
    <div className={styles.container}>
      <PopOver
        isVisible
        content={
          <div style={{ border: '1px solid red' }}>
            This is tooltip is a react component
          </div>
        }
      >
        Empty tooltips should not display
      </PopOver>
    </div>
  ))

  .add('empty', () => (
    <div className={styles.container}>
      <PopOver content="">Empty tooltips should not display</PopOver>
    </div>
  ))

  .add('theme variables', () => (
    <div className={styles.container}>
      <PopOver
        allowHTML
        content="this is a special tip with huge arrow and offset"
        offset={[0, 20]}
        themeVariables={{
          '--rp-pop-over-arrow-size': '20px',
          '--rp-pop-over-bg-color': 'white',
          '--rp-pop-over-border-style': 'solid',
          '--rp-pop-over-border-color': '#c6cdd6',
          '--rp-pop-over-border-radius': '5px',
          '--rp-pop-over-text-color': 'black',
        }}
      >
        HTML tip
      </PopOver>
    </div>
  ))
  .add('popperOptions', () => (
    <div className={styles.container}>
      <PopOver
        popperOptions={{
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                padding: 20,
              },
            },
          ],
        }}
        content="This tip should keep a 20px distance from the viewport edges"
      >
        distanced tip
      </PopOver>
    </div>
  ));
