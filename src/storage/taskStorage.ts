import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types/task';

const STORAGE_KEY = '@taskmanager:tasks';

export async function getTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as Task[];
}

async function persistTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function createTask(title: string, description: string): Promise<Task[]> {
  const tasks = await getTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
    createdAt: Date.now(),
  };
  const updated = [...tasks, newTask];
  await persistTasks(updated);
  return updated;
}

export async function updateTask(id: string, title: string, description: string): Promise<Task[]> {
  const tasks = await getTasks();
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, title, description } : task
  );
  await persistTasks(updated);
  return updated;
}

export async function toggleTaskStatus(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  await persistTasks(updated);
  return updated;
}

export async function deleteTask(id: string): Promise<Task[]> {
  const tasks = await getTasks();
  const updated = tasks.filter((task) => task.id !== id);
  await persistTasks(updated);
  return updated;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await getTasks();
  return tasks.find((task) => task.id === id);
}
