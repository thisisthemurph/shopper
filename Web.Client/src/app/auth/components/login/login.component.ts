import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';

import { Auth } from '../../Auth';
import { AuthService } from '../../services/auth.service';
import { standardHttpErrorResponseToErrorArray } from 'src/app/api/helpers/httpErrorResponse.helper';
import { StandardHttpErrorResponse } from 'src/app/api/models/httpErrorResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isSubmitting = false;
  submitErrors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.isSubmitting = true;
    this.submitErrors = [];

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(take(1))
      .subscribe({
        next: (token) => {
          Auth.storeToken(token);
          this.router.navigate(['list']);
        },
        error: (error: StandardHttpErrorResponse) => {
          this.isSubmitting = false;
          this.submitErrors = [
            ...this.submitErrors,
            ...standardHttpErrorResponseToErrorArray(error),
          ];
        },
      });
  }
}
