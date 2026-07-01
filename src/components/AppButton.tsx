import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type AppButtonVariant = 'primary' | 'secondary' | 'danger';

interface AppButtonOwnProps {
  label: string;
  variant?: AppButtonVariant;
}

type AppButtonProps = TouchableOpacityProps & AppButtonOwnProps;

export default function AppButton({ label, variant = 'primary', style, ...rest }: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, variantStyles[variant], style]}
      activeOpacity={0.75}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#6b7280' },
  danger: { backgroundColor: '#dc2626' },
});
