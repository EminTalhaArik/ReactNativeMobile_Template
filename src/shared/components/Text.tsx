import React from 'react';
import styled from 'styled-components/native';

export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

interface TextProps {
  variant?: TextVariant;
  color?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

const typographyMap: Record<TextVariant, {fontSize: keyof typeof sizes; lineHeight: keyof typeof lineHeights; fontWeight: '400' | '500' | '600'}> = {
  title: {fontSize: 'xl', lineHeight: 'relaxed', fontWeight: '600'},
  subtitle: {fontSize: 'lg', lineHeight: 'normal', fontWeight: '500'},
  body: {fontSize: 'md', lineHeight: 'normal', fontWeight: '400'},
  caption: {fontSize: 'sm', lineHeight: 'tight', fontWeight: '400'},
};

const sizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  display: 'display',
};

const lineHeights = {
  tight: 'tight',
  normal: 'normal',
  relaxed: 'relaxed',
};

const StyledText = styled.Text<Required<Pick<TextProps, 'align'>> & {variant: TextVariant; color?: string}>(({theme, variant, align, color}) => {
  const selected = typographyMap[variant];
  return {
    color: color ?? theme.colors.text,
    fontSize: theme.typography.sizes[selected.fontSize],
    lineHeight: theme.typography.sizes[selected.fontSize] * theme.typography.lineHeights[selected.lineHeight],
    fontFamily: theme.typography.fontFamily,
    fontWeight: selected.fontWeight,
    textAlign: align,
  };
});

export const Text: React.FC<TextProps> = ({variant = 'body', children, align = 'left', color}) => {
  return (
    <StyledText variant={variant} align={align} color={color}>
      {children}
    </StyledText>
  );
};
