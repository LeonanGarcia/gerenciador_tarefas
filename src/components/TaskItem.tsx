import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Task } from '../types/task';
import { colors, radii } from '../theme/tokens';
import TrashIcon from './TrashIcon';

interface TaskItemProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onPress, onToggle, onDelete }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: task.completed ? colors.border : colors.red }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: task.completed ? colors.red : colors.border, backgroundColor: task.completed ? colors.red : 'transparent' },
        ]}
        onPress={onToggle}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, task.completed && styles.titleDone]}>{task.title}</Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={onDelete}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <TrashIcon size={18} color={colors.red} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderRadius: radii.md,
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    marginRight: 14,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: colors.ink },
  titleDone: { textDecorationLine: 'line-through', color: colors.inkMuted },
  description: { fontSize: 13, color: colors.inkMuted, marginTop: 2 },
  deleteButton: { paddingHorizontal: 8, paddingVertical: 4 },
});