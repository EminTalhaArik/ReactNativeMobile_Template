import React from 'react';
import styled from 'styled-components/native';

interface CardProps {
  children: React.ReactNode;
  padded?: boolean;
}

const Container = styled.View<{padded: boolean}>(({theme, padded}) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: padded ? theme.spacing.lg : 0,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: theme.elevation.sm},
  shadowOpacity: 0.1,
  shadowRadius: theme.elevation.sm,
  elevation: theme.elevation.sm,
}));

export const Card: React.FC<CardProps> = ({children, padded = true}) => {
  return <Container padded={padded}>{children}</Container>;
};
