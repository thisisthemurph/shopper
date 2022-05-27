import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

enum PasswordResetType {
  Requesting = 'Requesting',
  Submitting = 'Submitting',
}

enum PasswordResetStatus {
  Pending, // A request for the password change has not yet been sent
  Submitted, // A request has now been sent
  Failed, // There was an issue with the request
  Succeeded, // The user's password has been updated
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  public hasToken = false;
  public isLoadingToken = true;
  public passwordResetRequestSent = false;

  public PasswordResetPageType = PasswordResetType;
  public passwordResetPage = PasswordResetType.Requesting;

  private resetToken: string | null = null;

  public PasswordResetStatus = PasswordResetStatus;
  public passwordResetStatus: PasswordResetStatus = PasswordResetStatus.Pending;

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public get email() {
    return this.resetPasswordForm.get('email');
  }

  public get password() {
    return this.submitPasswordForm.get('password');
  }

  public get canSubmit(): boolean {
    switch (this.passwordResetPage) {
      case PasswordResetType.Requesting:
        if (this.passwordResetRequestSent) {
          return false;
        }

        return !this.resetPasswordForm.invalid;

      case PasswordResetType.Submitting:
        return !this.submitPasswordForm.invalid;

      default:
        return false;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.resetToken = params.get('token');
      this.isLoadingToken = false;
      this.hasToken = this.resetToken !== null;
      this.passwordResetPage = this.hasToken
        ? PasswordResetType.Submitting
        : PasswordResetType.Requesting;
    });
  }

  /**
   * Requesting a token be sent in an email
   */
  onPasswordResetRequestSubmit(): void {
    if (!this.email?.valid) {
      alert('Enter an email address');
      return;
    }

    this.authService
      .requestPasswordReset(this.email.value)
      .pipe(take(1))
      .subscribe((success: boolean) => {
        this.passwordResetRequestSent = success;
      });
  }

  /**
   * Sending the new password to the server
   */
  onPasswordResetSubmit(): void {
    if (!this.password?.valid) {
      alert('The password does not meet the minimum requirements');
      return;
    }

    if (!this.resetToken) {
      return;
    }

    this.authService
      .resetPassword(this.resetToken, this.password.value)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          this.passwordResetStatus = PasswordResetStatus.Succeeded;
        } else {
          this.passwordResetStatus = PasswordResetStatus.Failed;
        }
      });
  }
}
