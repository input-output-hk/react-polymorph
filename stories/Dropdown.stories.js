// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

// components
import { Dropdown } from '../source/components/Dropdown';

// assets
import esIcon from './images/es.png';
import usIcon from './images/us.png';

// custom styles
import styles from './Dropdown.stories.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Dropdown', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('options',
    withState({ value: '' }, store => (
      <Dropdown
        label="languages"
        activeItem={store.state.value}
        onChange={value => store.set({ value })}
        items={[
          {
            value: 'es',
            label: <img src={esIcon} />
          }, {
            value: 'de',
            label: <img src={usIcon} />
          }
        ]}
      />
    ))
  );
