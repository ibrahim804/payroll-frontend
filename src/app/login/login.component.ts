import { AuthService } from './../all_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, ForgotPassword, VerifyCode, SetNewPassword } from '../config/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  choosenView: number = null;
  header: string = null;
  buttonActivity: string = null;
  isLoading: boolean = null;
  readOnlyMail: string = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.choosenView = 1;
    this.header = 'Login';
    this.buttonActivity = 'Login';
    this.isLoading = false;
    this.readOnlyMail = null;
  }

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (email.length === 0) {
      alert('Email is required');
      return;
    } else if (password.length === 0) {
      alert('Password is required');
      return;
    }

    const credentials: Login = { email, password };

    this.authService.login(credentials).subscribe(response => {
      if (response[0].status === 'FAILED') {
        alert(response[0].message);
        this.router.navigate(['/login']);
      } else {
        this.authService.setValueInLocalStorage('full_name', response[0].full_name);
        this.authService.setValueInLocalStorage('email', response[0].email);
        this.authService.setValueInLocalStorage('token', response[0].token);
        this.authService.setValueInLocalStorage('role', response[0].role);
        this.authService.setValueInLocalStorage('id', response[0].id);

        // this.getProfilePicture();
        this.router.navigate(['/dashboard']);
      }
    });
  }

  forgotPassword() {
    this.choosenView = 2;
    this.header = 'Forgot Password';
    this.buttonActivity = 'Send OTP';
  }

  sendOTP() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    this.authService.showSpinner();

    if (email.length === 0) {
      alert('Email must be provided to get email');
      this.authService.hideSpinner();

    } else {
      this.isLoading = true;
      const payload: ForgotPassword = {email};
      this.authService.sendVerificationCode(payload).subscribe(response => {
        this.isLoading = false;
        if (! this.checkError(response[0])) {
          this.choosenView = 3;
          this.header = 'OTP Verification';
          this.buttonActivity = 'Verify Code';
        }
        this.authService.hideSpinner();
      }, (err) => {
        this.authService.hideSpinner();
      });
    }
  }

  verifyOTP() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const code = (document.getElementById('code') as HTMLInputElement).value;

    if (email.length === 0) {
      alert('Email is required');
      return;
    } else if (code.length === 0) {
      alert('Code Must Be Given');
      return;
    }

    const payload: VerifyCode = {
      email,
      verification_code: code,
    };

    this.authService.verifyVerificationCode(payload).subscribe(response => {
      if (! this.checkError(response[0])) {
        this.readOnlyMail = payload.email;
        this.choosenView = 4;
        this.header = 'Set New Password';
        this.buttonActivity = 'Set And Login';
      }
    });
  }

  setNewPassword() {
    const newPassword = (document.getElementById('new_password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm_password') as HTMLInputElement).value;

    if (newPassword.length === 0) {
      alert('Password Must Be Given');
      return;
    } else if (confirmPassword.length === 0) {
      alert('Confirm Password must be given');
      return;
    } else if (newPassword !== confirmPassword) {
      alert('New Password And Confirm Password Doesn\'t match');
      return;
    }

    const payload: SetNewPassword = {
      email: this.readOnlyMail,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    this.authService.setNewPassword(payload).subscribe(response => {
      if (! this.checkError(response[0])) {
        alert('Password Updated Succefully');
        this.systemLogin(this.readOnlyMail, confirmPassword);
      }
    });
  }

  systemLogin(email: string, password: string) {
    const credentials: Login = { email, password };

    this.authService.login(credentials).subscribe(response => {
      if (response[0].status === 'FAILED') {
        alert(response[0].message);
        this.router.navigate(['/login']);
      } else {
        this.authService.setValueInLocalStorage('full_name', response[0].full_name);
        this.authService.setValueInLocalStorage('email', response[0].email);
        this.authService.setValueInLocalStorage('token', response[0].token);
        this.authService.setValueInLocalStorage('role', response[0].role);
        this.authService.setValueInLocalStorage('id', response[0].id);

        // this.getProfilePicture();
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

  // getProfilePicture() {
  //   this.authService.getFromHTTP(apiRoutes.getUserProfilePicture).subscribe(response => {
  //     if (response[0].status === 'OK') {
  //       this.authService.setValueInLocalStorage('photo_text', response[0].base64);
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       alert('Credentials are wrong.');
  //     }
  //   }, err=> {
  //     this.authService.setValueInLocalStorage('photo_text', null);
  //     this.router.navigate(['/dashboard']);
  //   });
  // }

}
