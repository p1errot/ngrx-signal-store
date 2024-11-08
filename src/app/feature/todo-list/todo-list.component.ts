import { Component, effect, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodosStore } from '../../store/todos.store';

@Component({
  selector: 'str-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  store = inject(TodosStore);
  newTodo = model('');
  filter = model('');

  constructor() {
    effect(
      () => {
        this.filter.set(this.store.filter());
      },
      { allowSignalWrites: true }
    );
  }

  async addTodo(event: SubmitEvent) {
    event.preventDefault();
    await this.store.addTodo(this.newTodo());
    this.newTodo.set('');
  }

  async deleteTodo(todo: string) {
    await this.store.deleteTodo(todo);
  }
}
