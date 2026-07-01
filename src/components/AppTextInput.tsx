import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/tokens';

interface AppTextInputOwnProps {
  label: string;
  error?: string;
}

type AppTextInputProps = TextInputProps & AppTextInputOwnProps;

export default function AppTextInput({ label, error, style, ...rest }: AppTextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.inkMuted}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 22 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.ink,
  },
  inputError: { borderBottomColor: colors.red },
  error: { color: colors.red, fontSize: 12, marginTop: 6, letterSpacing: 0.2 },
});