import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, ScrollViewProps} from 'react-native';

interface ScreenContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  padded?: boolean;
}

const Base = styled(SafeAreaView)(({theme}) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

const Content = styled.ScrollView<{padded: boolean}>(({theme, padded}) => ({
  flex: 1,
  paddingHorizontal: padded ? theme.spacing.lg : 0,
  paddingVertical: padded ? theme.spacing.lg : 0,
}));

export const ScreenContainer: React.FC<ScreenContainerProps> = ({children, padded = true, ...props}) => {
  return (
    <Base>
      <Content padded={padded} keyboardShouldPersistTaps="handled" {...props}>
        {children}
      </Content>
    </Base>
  );
};
