import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { SimpleTheme } from '../../source/themes/simple';
import { ThemeProvider } from '../../source/components/ThemeProvider';
import { SimpleSkins } from '../../source/skins/simple';

export const renderInSimpleTheme = (children) => (
  renderer.create(
    <ThemeProvider theme={SimpleTheme} skins={SimpleSkins}>
      {children}
    </ThemeProvider>
  )
);

export const mountInSimpleTheme = (children) => (
  mount(
    <ThemeProvider theme={SimpleTheme} skins={SimpleSkins}>
      {children}
    </ThemeProvider>
  )
);
