import React from 'react';
import { ThemeProvider } from '../../source/components/ThemeProvider';
import { SimpleTheme, SimpleDefaults } from '../../source/themes/simple';
import { SimpleSkins } from '../../source/skins/simple';

export const decorateWithSimpleTheme = (story) => (
  <ThemeProvider
    skins={SimpleSkins}
    theme={SimpleTheme}
    variables={SimpleDefaults}
  >
    {story()}
  </ThemeProvider>
);
