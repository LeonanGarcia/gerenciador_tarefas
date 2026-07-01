import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type TasksStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
};

export type RootTabParamList = {
  TarefasTab: NavigatorScreenParams<TasksStackParamList>;
  Resumo: undefined;
};

export type TaskListScreenProps = StackScreenProps<TasksStackParamList, 'TaskList'>;
export type TaskFormScreenProps = StackScreenProps<TasksStackParamList, 'TaskForm'>;