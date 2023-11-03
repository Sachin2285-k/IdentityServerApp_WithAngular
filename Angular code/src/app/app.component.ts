import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { Component, OnInit } from '@angular/core';
import { observeNotification } from 'rxjs/internal/Notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Demo_Web_App';
  isAuthenticated: boolean | undefined;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.oidcSecurityService
        .checkAuth()
        .subscribe((loginResponse: LoginResponse) => {
          const { isAuthenticated, userData, accessToken, idToken, configId } =
            loginResponse;
          // console.log(loginResponse);
          this.isAuthenticated = loginResponse.isAuthenticated;
          localStorage.setItem('currentUser', accessToken);
        });
    } catch (error) {
      console.log('Got error:', error);
    }
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logOut() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
