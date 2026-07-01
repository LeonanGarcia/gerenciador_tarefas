import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors, radii } from '../theme/tokens';

type AppButtonVariant = 'primary' | 'secondary' | 'danger';

interface AppButtonOwnProps {
  label: string;
  variant?: AppButtonVariant;
}

type AppButtonProps = TouchableOpacityProps & AppButtonOwnProps;

export default function AppButton({ label, variant = 'primary', style, ...rest }: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, containerVariants[variant], style]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={[styles.label, labelVariants[variant]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

const containerVariants = StyleSheet.create({
  primary: { backgroundColor: colors.red },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  danger: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.red },
});

const labelVariants = StyleSheet.create({
  primary: { color: colors.surface },
  secondary: { color: colors.ink },
  danger: { color: colors.red },
});