# Guia de Preparação — Arguição Oral

Isto é um roteiro de estudo, não um script para decorar. Leia o código real de cada arquivo enquanto revisa os pontos abaixo, para conseguir explicar com suas próprias palavras.

## 1. Arquitetura de navegação (`App.tsx`)
- `Tab.Navigator` cria as abas inferiores: `TarefasTab` e `Resumo`.
- Dentro de `TarefasTab` existe um `TasksStackNavigator`, que é um `NativeStackNavigator` com duas telas: `TaskList` e `TaskForm`.
- Ou seja: a navegação por abas "contém" a navegação em pilha. Trocar de aba não empilha tela; navegar de `TaskList` para `TaskForm` empilha (por isso aparece seta de voltar).

## 2. Passagem de parâmetros (`TaskListScreen.tsx` e `TaskFormScreen.tsx`)
- Em `TaskListScreen`, ao tocar numa tarefa: `navigation.navigate('TaskForm', { taskId: item.id })`.
- Ao criar nova tarefa: `navigation.navigate('TaskForm', { taskId: undefined })`.
- Em `TaskFormScreen`: `const taskId = route.params?.taskId;` — o `?.` (optional chaining) evita erro caso `route.params` seja `undefined`, retornando `undefined` em vez de quebrar a aplicação.
- Se `taskId` existir, o `useEffect` busca a tarefa salva e preenche o formulário (modo edição). Se não existir, o formulário fica vazio (modo criação).

## 3. Tipagem das rotas (`src/types/navigation.ts`)
- `TasksStackParamList` define quais telas existem na pilha e quais parâmetros cada uma recebe.
- `RootTabParamList` define as abas, incluindo `NavigatorScreenParams<TasksStackParamList>` para dizer que a aba `TarefasTab` "contém" um Stack tipado.
- `NativeStackScreenProps<TasksStackParamList, 'TaskForm'>` gera automaticamente os tipos de `navigation` e `route` daquela tela específica.
- Vantagem: autocomplete e erro em tempo de compilação se tentar navegar para uma tela que não existe ou passar parâmetro errado.

## 4. Persistência de dados (`src/storage/taskStorage.ts`)
- Tudo fica guardado sob uma única chave `STORAGE_KEY` no AsyncStorage, como uma string JSON.
- `getTasks()`: lê a string salva com `AsyncStorage.getItem`; se `raw` for `null` (chave não existe ainda), retorna array vazio em vez de tentar fazer `JSON.parse(null)`.
- Todas as operações (`createTask`, `updateTask`, `toggleTaskStatus`, `deleteTask`) seguem o mesmo padrão: buscam a lista atual, aplicam a alteração com métodos imutáveis (`map`, `filter`, spread `...tasks`) e regravam a lista inteira com `persistTasks`.

## 5. Hooks `useState` e `useEffect`
- `useState` guarda dados que mudam e re-renderizam a tela quando alterados: lista de tarefas, campos do formulário, contadores do resumo.
- `useEffect` (e a variante `useFocusEffect`, do React Navigation) dispara código em resposta a um evento — no caso, "a tela ganhou foco" — para recarregar os dados sempre que o usuário volta para aquela tela (por exemplo, depois de salvar uma tarefa).
- Em `TaskFormScreen`, o `useEffect` depende de `[taskId]`: roda quando a tela monta e sempre que o parâmetro `taskId` mudar.

## 6. Componente reutilizável (`AppButton.tsx` / `AppTextInput.tsx`)
- O tipo é uma interseção: `TouchableOpacityProps & AppButtonOwnProps`. Isso significa "todas as props nativas de TouchableOpacity, mais as props personalizadas (`label`, `variant`)".
- No JSX, `{...rest}` espalha todas as props nativas recebidas (como `onPress`, `disabled`) direto no componente nativo por baixo, sem precisar redeclarar cada uma manualmente.
- Isso permite usar `<AppButton onPress={...} disabled={...} label="Salvar" />` normalmente, como se fosse um TouchableOpacity, só que com uma cara padronizada.

## 7. Renderização da lista (`TaskListScreen.tsx`)
- `keyExtractor={(item) => item.id}` diz ao React qual identificador único usar para cada item, evitando bugs de re-renderização ao reordenar/excluir.
- `renderItem` recebe o item e retorna o componente `TaskItem` correspondente.
- `FlatList` é preferível a `.map()` porque ela renderiza sob demanda (virtualização): só monta os itens visíveis na tela, economizando memória e mantendo performance em listas grandes; `.map()` renderizaria todos os itens de uma vez.

## 8. Estilização e layout (Flexbox)
- `flex: 1` faz o container ocupar todo o espaço disponível do pai.
- `flexDirection: 'row'` em `TaskItem` coloca checkbox, texto e botão de excluir lado a lado (por padrão seria `column`).
- `justifyContent` controla o alinhamento no eixo principal (ex.: `center` no `SummaryScreen` centraliza os cards verticalmente); `alignItems` controla o eixo cruzado (ex.: `center` alinha o checkbox e o texto verticalmente na mesma linha).
- `flexWrap: 'wrap'` no `SummaryScreen` permite que os cards quebrem para a linha seguinte quando não cabem lado a lado.

---

### Dica para a arguição
Para cada ponto, tenha em mente: **o quê** o código faz, **onde** está (arquivo e linha) e **por quê** foi feito daquela forma (qual problema resolve). O professor tende a valorizar mais o "por quê" do que a simples leitura do código.
