import { UpdateUserComponent } from './dialogs/update-user/update-user.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { UserGuard } from './_guard/user.guard';
import { LoggedInGuard } from './_guard/logged-in.guard';
import { BlankComponent } from './blank-component/blank-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_guard/auth.guard';
import { DepartmentsComponent } from './departments/departments.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { TodaysAttendanceComponent } from './todays-attendance/todays-attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { SalaryManagementComponent } from './salary-management/salary-management.component';
import { SalaryComponent } from './salary/salary.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { AdminGuard } from './_guard/admin.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentComponent } from './payment/payment.component';
import { ApplyLoanRequestComponent } from './apply-loan-request/apply-loan-request.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanPayBackComponent } from './loan-pay-back/loan-pay-back.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInGuard]
      }
    ]
  },
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'dashboard',
        // component: DashboardComponent,
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'departments',
        redirectTo: '/departments/list',
        pathMatch: 'full',
      },
      {
        path: 'departments/list',
        component: DepartmentsComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'departments/add',
        component: AddDepartmentComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'employees',
        redirectTo: '/employees/list',
        pathMatch: 'full'
      },
      {
        path: 'employees/list',
        component: EmployeesComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'employees/add',
        component: AddEmployeeComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      {
        path: 'employees/details',
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'employees/update',
        component: UpdateUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'attendance',
        component: TodaysAttendanceComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'attendance/report',
        component: AttendanceReportComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'leave',
        redirectTo: '/leave/management',
        pathMatch: 'full'
      },
      {
        path: 'leave/management',
        component: LeaveManagementComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'leave/application',
        component: LeaveComponent,
        canActivate: [AuthGuard, UserGuard]
      },
      {
        path: 'salary',
        redirectTo: '/salary/management',
        pathMatch: 'full'
      },
      {
        path: 'salary/management',
        component: SalaryComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'salary/update',
        component: SalaryManagementComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'loan/requests',
        component: LoanRequestComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'loan/paybacks',
        component: LoanPayBackComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'loan/histories',
        component: LoanHistoryComponent,
        canActivate: [AuthGuard, UserGuard]
      },
      {
        path: 'loan/application',
        component: ApplyLoanRequestComponent,
        canActivate: [AuthGuard, UserGuard]
      },
      {
        path: 'settings',
        component: GeneralSettingsComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
