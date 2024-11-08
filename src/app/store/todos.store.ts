import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { Todo } from '../model/todo.model';
import { TodosService } from '../services/todos.service';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },
    async addTodo(title: string) {
      const todo = await todosService.addTodo({ title, completed: false });
      patchState(store, (store) => ({
        todos: [...store.todos, todo],
      }));
    },
    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (store) => ({
        todos: store.todos.filter((todo) => todo.id !== id),
      }));
    },
    async toggleTodo(id: string) {
      await todosService.toggleTodo(id);
      patchState(store, (store) => ({
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((store) => ({
    filteredTodos: computed(() => {
      const todos = store.todos();

      switch (store.filter()) {
        case 'pending':
          return todos.filter((todo) => !todo.completed);
        case 'completed':
          return todos.filter((todo) => todo.completed);
        default:
          return todos;
      }
    }),
  }))
);
