import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TodosStore } from './store/todos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
