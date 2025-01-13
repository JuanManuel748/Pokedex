import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  // Iniciar sesión con Google
  loginWithGoogle(): void {
    this.authService.loginWithGoogle().catch((error) => {
      this.errorMessage = error.message;
    });
  }
}