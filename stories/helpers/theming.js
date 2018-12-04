import React from 'react';
import { ThemeProvider } from '../../source/components/ThemeProvider';
import { SimpleTheme } from '../../source/themes/simple';
import { SimpleSkins } from '../../source/skins/simple';

export const decorateWithSimpleTheme = (story) => (
  <ThemeProvider theme={SimpleTheme} skins={SimpleSkins}>
    {story()}
  </ThemeProvider>
);
