import { Component, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodosStore } from '../../store/todos.store';
import { TodosService } from './../../services/todos.service';

@Component({
  selector: 'str-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  store = inject(TodosStore);
  todosService = inject(TodosService);
  newTodo = model('');

  async addTodo(event: SubmitEvent) {
    event.preventDefault();
    await this.store.addTodo(this.newTodo());
    this.newTodo.set('');
  }

  async deleteTodo(todo: string) {
    await this.store.deleteTodo(todo);
  }
}
