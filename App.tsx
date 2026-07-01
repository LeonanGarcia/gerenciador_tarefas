import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootTabParamList, TasksStackParamList } from './src/types/navigation';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import { colors } from './src/theme/tokens';

const Tab = createBottomTabNavigator<RootTabParamList>();
const TasksStack = createStackNavigator<TasksStackParamList>();

function TasksStackNavigator() {
  return (
    <TasksStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface, shadowColor: 'transparent', elevation: 0 },
        headerTitleStyle: { color: colors.ink, fontWeight: '700', letterSpacing: 0.3 },
        headerTintColor: colors.red,
      }}
    >
      <TasksStack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Gerenciador de Tarefas' }} />
      <TasksStack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Formulário' }} />
    </TasksStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.inkMuted,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        }}
      >
        <Tab.Screen name="TarefasTab" component={TasksStackNavigator} options={{ title: 'Tarefas' }} />
        <Tab.Screen name="Resumo" component={SummaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}