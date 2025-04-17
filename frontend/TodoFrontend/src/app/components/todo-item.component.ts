import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-2">
      <div class="card-body">
        <h5>{{ todo.title }}</h5>
        <p>{{ todo.description }}</p>
      </div>
    </div>
  `,
})
export class TodoItemComponent {
  @Input() todo: any;
}
