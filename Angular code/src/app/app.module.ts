import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractSecurityStorage, AuthModule, DefaultLocalStorageService, LogLevel } from 'angular-auth-oidc-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent
    // SigninOidcComponent
  ],
  
  imports: [
    BrowserAnimationsModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5001',
        redirectUrl: 'http://localhost:4200/home',
        postLogoutRedirectUri: 'http://localhost:4200/home',
        clientId: 'web',
        scope: 'openid profile api1 offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3500,
      easing: 'ease-in',
      easeTime: 1700
    }),
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: AbstractSecurityStorage,
      useClass: DefaultLocalStorageService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
