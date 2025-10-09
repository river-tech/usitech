export interface ForgotPasswordForm {
  email: string;
}

export interface OtpVerificationForm {
  otp: string;
}

export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
