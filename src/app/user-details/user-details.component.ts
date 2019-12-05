import { urlRoutes } from './../config/apiRoutes';
import { Component, OnInit } from '@angular/core';
import { User } from './../config/interfaces/user.interface';
import { UserService } from './../all_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getLoggedInEmployee().subscribe(response => {
      if (! this.checkError(response[0])) {
        this.user = response[0].description;
        console.log(this.user);
      }
    });
  }

  redirectsToDashboard() {
    this.router.navigate([urlRoutes.dashboard]);
  }

  redirectsToEmployeeAdd() {
    this.router.navigate([urlRoutes.employeesAdd]);
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
