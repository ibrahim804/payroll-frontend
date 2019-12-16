import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';

import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalaryManagementComponent } from './salary-management/salary-management.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { SalaryComponent } from './salary/salary.component';
import { GeneratePayrollComponent } from './generate-payroll/generate-payroll.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { AuthGuard } from './_guard/auth.guard';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { FileUploadModule } from 'ng2-file-upload';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { LeaveComponent } from './leave/leave.component';
import { TodaysAttendanceComponent } from './todays-attendance/todays-attendance.component';
// import { ChartsModule, WavesModule, MDBBootstrapModule  } from 'angular-bootstrap-md';

import { ChartsModule } from 'ng2-charts';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { BlankComponent } from './blank-component/blank-component.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DialogSalaryDetailsComponent } from './dialog-salary-details/dialog-salary-details.component';
import { DialogLeaveDetailsComponent } from './dialogs/dialog-leave-details/dialog-leave-details.component';
import { DialogConfirmationComponent } from './dialogs/dialog-confirmation/dialog-confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { ProvidentFundComponent } from './provident-fund/provident-fund.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { DialogLoanRequestComponent } from './dialogs/dialog-loan-request/dialog-loan-request.component';
import { ApplyLoanRequestComponent } from './apply-loan-request/apply-loan-request.component';
import { DialogPayLoanComponent } from './dialogs/dialog-pay-loan/dialog-pay-loan.component';
import { LoanPayBackComponent } from './loan-pay-back/loan-pay-back.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    DashboardComponent,
    DepartmentsComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    SalaryManagementComponent,
    AddDepartmentComponent,
    SalaryComponent,
    GeneratePayrollComponent,
    GeneralSettingsComponent,
    LeaveManagementComponent,
    LeaveComponent,
    TodaysAttendanceComponent,
    AttendanceReportComponent,
    BlankComponent,
    UserDetailsComponent,
    DialogSalaryDetailsComponent,
    DialogLeaveDetailsComponent,
    DialogConfirmationComponent,
    PaymentComponent,
    ProvidentFundComponent,
    LoanHistoryComponent,
    LoanRequestComponent,
    DialogLoanRequestComponent,
    ApplyLoanRequestComponent,
    DialogPayLoanComponent,
    LoanPayBackComponent,
    UpdateUserComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    NgbModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [
    DialogSalaryDetailsComponent,
    DialogLeaveDetailsComponent,
    DialogConfirmationComponent,
    DialogLoanRequestComponent,
    DialogPayLoanComponent,
    ApplyLoanRequestComponent,
  ],
  providers: [
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
