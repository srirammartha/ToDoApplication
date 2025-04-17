import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Register</h2>
      <form (ngSubmit)="register()">
        <input
          [(ngModel)]="username"
          name="username"
          placeholder="Username"
          class="form-control mb-2"
          required
        />
        <input
          [(ngModel)]="password"
          name="password"
          type="password"
          placeholder="Password"
          class="form-control mb-2"
          required
        />
        <button class="btn btn-success">Register</button>
      </form>
    </div>
  `,
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.username, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
