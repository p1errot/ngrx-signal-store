import { Component, inject, model } from '@angular/core';
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

  addTodo(event: SubmitEvent) {}
}
