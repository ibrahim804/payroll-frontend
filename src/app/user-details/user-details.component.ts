import { UpdateUserComponent } from './../dialogs/update-user/update-user.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../all_services/auth.service';
import { urlRoutes } from './../config/apiRoutes';
import { Component, OnInit } from '@angular/core';
import { User, UpdatePassword } from './../config/interfaces/user.interface';
import { UserService } from './../all_services/user.service';
import { Router } from '@angular/router';
import { SingleObj } from '../config/interfaces/salary.interface';
import { SalaryService } from '../all_services/salary.service';
import { DialogPasswordUpdateComponent } from '../dialogs/dialog-password-update/dialog-password-update.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  isDefaultView = true;
  salaryHeader = 'Salary Information';
  employeeHeader = 'Employee Information';
  defaultHeader = 'Employee Information';
  employeeSalary: SingleObj;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private salaryService: SalaryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.redirectsToEmployeeInformation();
  }

  redirectsToDashboard() {
    this.router.navigate([urlRoutes.dashboard]);
  }

  redirectsToEmployeeUpdate() {
    // this.router.navigate([urlRoutes.employeeUpdate]);
    this.dialog.open(UpdateUserComponent, {
      width: '65vw',

    }).afterClosed().subscribe(response => {
      // console.log(response);
      this.redirectsToEmployeeInformation();
    });
  }

  redirectsToPasswordUpdate() {
    this.dialog.open(DialogPasswordUpdateComponent, {
      data: {
        message: 'Password Update',
      }
    }).afterClosed().subscribe(inputs => {
      if (! inputs) return;   // when user cancels
      const structuredData: UpdatePassword = inputs; // to be sure that it receives data of UpdatePassword Type
      this.authService.changePassword(structuredData).subscribe(response => {
        if (! this.checkError(response[0])) {
          alert('Password Updated Successfully');
          this.authService.logout(() => {
            this.router.navigate([urlRoutes.login]);
          });
        }
      });
    });
  }

  redirectsToEmployeeInformation() {
    this.userService.getLoggedInEmployee().subscribe(response => {
      if (! this.checkError(response[0])) {
        this.user = response[0].description;
        this.isDefaultView = true;
        this.defaultHeader = this.employeeHeader;
      }
    });
  }

  redirectsToEmployeeSalary() {
    this.salaryService.getMySalary().subscribe(response => {
      if (response[0].status === 'OK') {
        this.employeeSalary = response[0].salary;
        this.employeeSalary.gross_salary = response[0].gross_salary;
        this.employeeSalary.total_deduction = response[0].total_deduction;
        this.employeeSalary.net_salary = response[0].net_salary;
        this.assignDefaultValue();
        this.isDefaultView = false;
        this.defaultHeader = this.salaryHeader;
        // console.log(this.employeeSalary);
      } else {
        alert('Salary not set yet');
      }
    });
  }

  private assignDefaultValue() {
    if (! this.employeeSalary.basic_salary) { this.employeeSalary.basic_salary = '0'; }
    if (! this.employeeSalary.house_rent_allowance) { this.employeeSalary.house_rent_allowance = '0'; }
    if (! this.employeeSalary.medical_allowance) { this.employeeSalary.medical_allowance = '0'; }
    if (! this.employeeSalary.special_allowance) { this.employeeSalary.special_allowance = '0'; }
    if (! this.employeeSalary.fuel_allowance) { this.employeeSalary.fuel_allowance = '0'; }
    if (! this.employeeSalary.phone_bill_allowance) { this.employeeSalary.phone_bill_allowance = '0'; }
    if (! this.employeeSalary.other_allowance) { this.employeeSalary.other_allowance = '0'; }
    if (! this.employeeSalary.tax_deduction) { this.employeeSalary.tax_deduction = '0'; }
    if (! this.employeeSalary.provident_fund) { this.employeeSalary.provident_fund = '0'; }
    if (! this.employeeSalary.other_deduction) { this.employeeSalary.other_deduction = '0'; }
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
