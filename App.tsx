import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootTabParamList, TasksStackParamList } from './src/types/navigation';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import SummaryScreen from './src/screens/SummaryScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const TasksStack = createNativeStackNavigator<TasksStackParamList>();

function TasksStackNavigator() {
  return (
    <TasksStack.Navigator screenOptions={{ headerShown: true }}>
      <TasksStack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tarefas' }} />
      <TasksStack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Formulário' }} />
    </TasksStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="TarefasTab" component={TasksStackNavigator} options={{ title: 'Tarefas' }} />
        <Tab.Screen name="Resumo" component={SummaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
