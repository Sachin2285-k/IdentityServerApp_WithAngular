import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();
  registrationErrors: string[] = [];
  
  constructor(private httpClient: HttpClient, private appComponent: AppComponent) {}

  url = 'https://localhost:5001/api/register/registerUser';

  getRegister() {
    this.httpClient.post(this.url, this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.appComponent.login();
      },
      (error) => {
       console.log(error.error.errors);
       
       this.registrationErrors = [];
      
       if (error.error.errors) {
        const errorKeys = Object.keys(error.error.errors);
        errorKeys.forEach(key => {
          this.registrationErrors.push(...error.error.errors[key]);
        });
      }
          
      }
    );
  }
}
