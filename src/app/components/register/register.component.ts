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

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.addUser(this.user).subscribe(
      response => {
        alert('Utilisateur créé avec succès!');
      },
      error => {
        console.error(error);
        alert('Erreur lors de la création de l\'utilisateur');
      }
    );
  }
}
