import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.verifyEmail(this.user.email).subscribe(
      (emailExists: boolean) => {
        if (!emailExists) {
          this.errorMessage = 'Adresse e-mail introuvable. Veuillez vérifier ou vous inscrire.';
        } else {
          this.userService.loginUser(this.user).subscribe(
            (response: any) => {
              // Stocker le token et rediriger
              localStorage.setItem('authToken', response.token);
              this.router.navigate(['/dashboard']);
            },
            error => {
              if (error.status === 401) {
                this.errorMessage = 'Mot de passe incorrect.';
              } else {
                this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
              }
            }
          );
        }
      },
      () => {
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    );
  }
}
