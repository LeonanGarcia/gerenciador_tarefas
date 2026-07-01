import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onPress, onToggle, onDelete }: TaskItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        <View style={[styles.checkboxInner, task.completed && styles.checkboxChecked]} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.title, task.completed && styles.titleDone]}>{task.title}</Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteLabel}>Excluir</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  checkboxChecked: { backgroundColor: '#2563eb' },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  titleDone: { textDecorationLine: 'line-through', color: '#9ca3af' },
  description: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  deleteButton: { paddingHorizontal: 8, paddingVertical: 4 },
  deleteLabel: { color: '#dc2626', fontSize: 13, fontWeight: '600' },
});
