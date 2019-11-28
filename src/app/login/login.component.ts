import { AuthService } from './../all_services/auth.service';
import { UserService } from './../all_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../config/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login() {
    const credentials: Login = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    this.userService.login(credentials).subscribe(response => {
      if (response[0].status === 'FAILED') {
        alert(response[0].message);
        this.router.navigate(['/login']);
      } else {
        this.authService.setValueInLocalStorage('full_name', response[0].full_name);
        this.authService.setValueInLocalStorage('email', response[0].email);
        this.authService.setValueInLocalStorage('token', response[0].token);
        this.authService.setValueInLocalStorage('role', response[0].role);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
