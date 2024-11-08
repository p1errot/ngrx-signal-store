import { Injectable } from '@angular/core';

import { TODOS } from '../model/mock.data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(1000);

    return [...TODOS];
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(500);

    return {
      id: Date.now(),
      ...todo,
    } as Todo;
  }

  async deleteTodo(id: string) {
    await sleep(500);
    return id;
  }

  async toggleTodo(id: string) {
    await sleep(500);
    return id;
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
