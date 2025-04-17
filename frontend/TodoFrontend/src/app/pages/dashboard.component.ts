import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from '../components/todo-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  template: `
    <div class="container mt-4">
      <h2>My Todos</h2>
      <form (ngSubmit)="createTodo()" class="mb-3">
        <input
          [(ngModel)]="title"
          name="title"
          placeholder="Title"
          class="form-control mb-2"
        />
        <input
          [(ngModel)]="description"
          name="description"
          placeholder="Description"
          class="form-control mb-2"
        />
        <button class="btn btn-primary">Add Todo</button>
      </form>
      <app-todo-item *ngFor="let todo of todos" [todo]="todo"></app-todo-item>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  todos: any[] = [];
  title = '';
  description = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService
      .getTodos()
      .subscribe((data: any) => (this.todos = data as any[]));
  }

  createTodo() {
    this.todoService
      .createTodo(this.title, this.description)
      .subscribe((todo) => {
        this.todos.push(todo);
        this.title = '';
        this.description = '';
      });
  }
}
