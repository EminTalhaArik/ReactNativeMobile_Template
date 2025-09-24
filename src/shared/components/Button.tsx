import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<{variant: ButtonVariant; disabled?: boolean;}>
  ${({theme, variant, disabled}) => ({
    backgroundColor:
      variant === 'ghost'
        ? 'transparent'
        : variant === 'secondary'
        ? theme.colors.secondary
        : theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    opacity: disabled ? 0.6 : 1,
    borderWidth: variant === 'ghost' ? 1 : 0,
    borderColor: variant === 'ghost' ? theme.colors.border : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  })};

const ButtonLabel = styled.Text<{variant: ButtonVariant}>(({theme, variant}) => ({
  color:
    variant === 'ghost'
      ? theme.colors.text
      : variant === 'secondary'
      ? theme.colors.secondaryContrast
      : theme.colors.primaryContrast,
  fontSize: theme.typography.sizes.md,
  fontFamily: theme.typography.fontFamily,
  fontWeight: '600',
}));

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
}) => {
  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <ButtonContainer variant={variant} disabled={disabled || loading} onPress={handlePress}>
      {loading ? <ActivityIndicator color={variant === 'ghost' ? '#777' : '#fff'} /> : <ButtonLabel variant={variant}>{label}</ButtonLabel>}
    </ButtonContainer>
  );
};
