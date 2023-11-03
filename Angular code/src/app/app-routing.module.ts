import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent, canActivate: [authGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  // { path: 'signin-oidc', component: SigninOidcComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
