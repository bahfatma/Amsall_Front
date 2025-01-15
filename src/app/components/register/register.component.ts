import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    passWord: '',
    phoneNumber: ''
  };

  passwordErrors: string[] = []; 
  isSubmitted: boolean = false;

  constructor(private userService: UserService) {}

  validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères.');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre majuscule.');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre minuscule.');
    }

    if (!/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre.');
    }

    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial.');
    }

    return errors;
  }

  onSubmit() {
    this.isSubmitted = true; // Marque le formulaire comme soumis
    this.passwordErrors = this.validatePassword(this.user.passWord); 

    if (this.passwordErrors.length === 0) {
      this.userService.addUser(this.user).subscribe(
        response => {
          alert('Utilisateur créé avec succès!');
        },
        error => {
          console.error(error);
          alert('Erreur lors de la création de l\'utilisateur.');
        }
      );
    }
  }
}
