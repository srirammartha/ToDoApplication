import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
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
        <button class="btn btn-primary">Login</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
