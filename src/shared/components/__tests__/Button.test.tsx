import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@shared/theme/modes/light';
import {Button} from '../Button';

describe('Button', () => {
  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <ThemeProvider theme={lightTheme}>
        <Button label="Kaydet" onPress={onPress} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText('Kaydet'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
