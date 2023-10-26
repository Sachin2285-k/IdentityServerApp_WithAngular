import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractSecurityStorage, AuthModule, DefaultLocalStorageService, LogLevel } from 'angular-auth-oidc-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent
  ],
  
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5001',
        redirectUrl: 'http://localhost:4200/signin-oidc',
        postLogoutRedirectUri: 'http://localhost:4200/signout-callback-oidc',
        clientId: 'web',
        scope: 'openid profile api1',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem('currentUser') as string).token : null;
    //     }
    //   }
    // })
  ],
  providers: [{
    provide: AbstractSecurityStorage,
      useClass: DefaultLocalStorageService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
