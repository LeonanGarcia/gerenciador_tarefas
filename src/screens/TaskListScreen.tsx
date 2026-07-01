import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { TaskListScreenProps } from '../types/navigation';
import type { Task } from '../types/task';
import { deleteTask, getTasks, toggleTaskStatus } from '../storage/taskStorage';
import AppButton from '../components/AppButton';
import TaskItem from '../components/TaskItem';

export default function TaskListScreen({ navigation }: TaskListScreenProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    const stored = await getTasks();
    setTasks(stored);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  async function handleToggle(id: string) {
    const updated = await toggleTaskStatus(id);
    setTasks(updated);
  }

  async function handleDelete(id: string) {
    const updated = await deleteTask(id);
    setTasks(updated);
  }

  return (
    <View style={styles.container}>
      <AppButton
        label="Nova tarefa"
        onPress={() => navigation.navigate('TaskForm', { taskId: undefined })}
        style={styles.addButton}
      />
      {!loading && tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa cadastrada.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => navigation.navigate('TaskForm', { taskId: item.id })}
              onToggle={() => handleToggle(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingTop: 16 },
  addButton: { marginBottom: 16 },
  list: { paddingBottom: 24 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 40, fontSize: 15 },
});
