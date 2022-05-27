import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: 'passwordReset/:token', component: PasswordResetComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordResetComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [],
})
export class AuthModule {}
