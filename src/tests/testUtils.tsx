import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@shared/theme/modes/light';

const Providers = ({children}: PropsWithChildren) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Providers>{ui}</Providers>);
};
