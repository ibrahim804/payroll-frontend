import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {

    let employee = new Employee();

    employee.email = (<HTMLInputElement>document.getElementById("email")).value;
    employee.password = (<HTMLInputElement>document.getElementById("password")).value;

    this.loginService.login(employee).subscribe(data => {
      if (data[0].status === "FAILED"){
        alert(data[0].message);
        this.router.navigate(['/login']);
      }

      else{
        localStorage.setItem('token', data[0].token);
        this.router.navigate(['/home']);
        console.log(data);
      }
    })
  }

}
