import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TasksStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
};

export type RootTabParamList = {
  TarefasTab: NavigatorScreenParams<TasksStackParamList>;
  Resumo: undefined;
};

export type TaskListScreenProps = NativeStackScreenProps<TasksStackParamList, 'TaskList'>;
export type TaskFormScreenProps = NativeStackScreenProps<TasksStackParamList, 'TaskForm'>;
