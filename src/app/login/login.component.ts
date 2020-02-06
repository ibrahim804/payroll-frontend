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

  choosenViews: number [] = [0, 1, 2, 3, 4];
  headings: string [] = ['Dummy', 'Login', 'Forgot Password', 'OTP Verification', 'Set New Password'];
  buttonActivities: string [] = ['Dummy', 'Login', 'Send OTP', 'Verify Code', 'Set And Login'];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.choosenView = this.choosenViews[1];
    this.header = this.headings[1];
    this.buttonActivity = this.buttonActivities[1];
    this.isLoading = false;
    this.readOnlyMail = null;
  }

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (email.length === 0) {
      alert('Email is required');
    } else if (password.length === 0) {
      alert('Password is required');
    } else {
      this.loginToSystem(email, password);
    }
  }

  goBack(currentState: number) {
    this.choosenView = this.choosenViews[currentState-1];
    this.header = this.headings[currentState-1];
    this.buttonActivity = this.buttonActivities[currentState-1];
  }

  forgotPassword() {
    this.choosenView = this.choosenViews[2];
    this.header = this.headings[2];
    this.buttonActivity = this.buttonActivities[2];
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
          this.choosenView = this.choosenViews[3];
          this.header = this.headings[3];
          this.buttonActivity = this.buttonActivities[3];
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
        this.choosenView = this.choosenViews[4];
        this.header = this.headings[4];
        this.buttonActivity = this.buttonActivities[4];
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
    } else if (newPassword.length < 6 || newPassword.length > 30) {
      alert('Password should be minimum 6 characters and maximum 30 characters');
      return;
    }

    const payload: SetNewPassword = {
      email: this.readOnlyMail,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    this.authService.setNewPassword(payload).subscribe(response => {
      if (! this.checkError(response[0])) {
        alert('Password Updated Successfully');
        this.loginToSystem(this.readOnlyMail, confirmPassword);
      }
    });
  }

  loginToSystem(email: string, password: string) {
    const credentials: Login = { email, password };

    this.authService.login(credentials).subscribe(response => {
      if (! this.checkError(response[0])) {
        this.authService.setValueInLocalStorage('full_name', response[0].full_name);
        this.authService.setValueInLocalStorage('email', response[0].email);
        this.authService.setValueInLocalStorage('token', response[0].token);
        this.authService.setValueInLocalStorage('role', response[0].role);
        // this.authService.setCurrentRole(response[0].role);
        // this.getProfilePicture();
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
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
