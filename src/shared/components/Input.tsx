import React from 'react';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

const Container = styled.View(({theme}) => ({
  marginBottom: theme.spacing.md,
}));

const Label = styled.Text(({theme}) => ({
  marginBottom: theme.spacing.xs,
  color: theme.colors.text,
  fontSize: theme.typography.sizes.sm,
}));

const StyledInput = styled.TextInput<{hasError: boolean}>(({theme, hasError}) => ({
  borderWidth: 1,
  borderColor: hasError ? theme.colors.danger : theme.colors.border,
  borderRadius: theme.radius.md,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  color: theme.colors.text,
  backgroundColor: theme.colors.surface,
}));

const Error = styled.Text(({theme}) => ({
  marginTop: theme.spacing.xs,
  color: theme.colors.danger,
  fontSize: theme.typography.sizes.xs,
}));

export const Input: React.FC<InputProps> = ({label, error, ...props}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput hasError={Boolean(error)} placeholderTextColor="#9CA3AF" {...props} />
      {error ? <Error>{error}</Error> : null}
    </Container>
  );
};
