import { colors } from '../theme/tokens';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { TaskFormScreenProps } from '../types/navigation';
import { createTask, getTaskById, updateTask } from '../storage/taskStorage';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function TaskFormScreen({ route, navigation }: TaskFormScreenProps) {
  const taskId = route.params?.taskId;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    async function loadTask() {
      if (!taskId) {
        return;
      }
      const existing = await getTaskById(taskId);
      if (existing) {
        setTitle(existing.title);
        setDescription(existing.description);
      }
    }
    loadTask();
  }, [taskId]);

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('O título é obrigatório');
      return;
    }
    if (taskId) {
      await updateTask(taskId, title.trim(), description.trim());
    } else {
      await createTask(title.trim(), description.trim());
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <AppTextInput
        label="Título"
        placeholder="Digite o título da tarefa"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (titleError) {
            setTitleError('');
          }
        }}
        error={titleError}
      />
      <AppTextInput
        label="Descrição"
        placeholder="Digite a descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />
      <AppButton label={taskId ? 'Salvar alterações' : 'Adicionar tarefa'} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
});
