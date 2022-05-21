import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { standardHttpErrorResponseToErrorArray } from 'src/app/api/helpers/httpErrorResponse.helper';
import { StandardHttpErrorResponse } from 'src/app/api/models/httpErrorResponse.interface';
import { Auth } from '../../Auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  isSubmitting = false;
  submitErrors: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  onSubmit() {
    this.isSubmitting = true;
    this.submitErrors = [];

    this.authService
      .register({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .pipe(take(1))
      .subscribe({
        next: (user) => console.log({ user }),
        error: (error: StandardHttpErrorResponse) => {
          console.warn('Ther has been error');
          this.isSubmitting = false;
          this.submitErrors = [
            ...this.submitErrors,
            ...standardHttpErrorResponseToErrorArray(error),
          ];
        },
      });
  }
}
