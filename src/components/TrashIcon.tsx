import React from 'react';
import { View } from 'react-native';
import { colors } from '../theme/tokens';

interface TrashIconProps {
  size?: number;
  color?: string;
}

export default function TrashIcon({ size = 18, color = colors.red }: TrashIconProps) {
  const unit = size / 16;
  return (
    <View style={{ width: size, alignItems: 'center' }}>
      <View
        style={{
          width: 6 * unit,
          height: 3 * unit,
          backgroundColor: color,
          borderTopLeftRadius: unit,
          borderTopRightRadius: unit,
        }}
      />
      <View
        style={{
          width: 14 * unit,
          height: 2 * unit,
          backgroundColor: color,
          borderRadius: unit,
          marginTop: unit,
        }}
      />
      <View
        style={{
          width: 11 * unit,
          height: 9 * unit,
          backgroundColor: color,
          borderBottomLeftRadius: 2 * unit,
          borderBottomRightRadius: 2 * unit,
          marginTop: unit,
        }}
      />
    </View>
  );
}