# Gerenciador de Tarefas — React Native + TypeScript

## Como rodar

```bash
npm install
npx expo start
```

Abra no emulador (Android/iOS) ou no app **Expo Go** escaneando o QR Code.

## Estrutura

```
App.tsx
src/
  types/
    task.ts          -> tipo Task
    navigation.ts     -> tipagem das rotas (Stack e Tabs)
  storage/
    taskStorage.ts    -> CRUD com AsyncStorage
  components/
    AppButton.tsx     -> botão reutilizável
    AppTextInput.tsx  -> campo de texto reutilizável
    TaskItem.tsx       -> item da FlatList
  screens/
    TaskListScreen.tsx  -> lista de tarefas (Stack)
    TaskFormScreen.tsx  -> cadastro/edição (Stack)
    SummaryScreen.tsx    -> resumo (aba separada)
```

## Navegação

- **Bottom Tabs**: `TarefasTab` (contém o Stack de tarefas) e `Resumo`.
- **Stack** dentro de `TarefasTab`: `TaskList` -> `TaskForm`.
- Ao tocar em uma tarefa existente, o `id` é passado via `route.params.taskId`; ao criar uma nova, o parâmetro vai `undefined`.
