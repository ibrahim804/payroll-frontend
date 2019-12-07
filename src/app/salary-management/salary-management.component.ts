import { Create, Update } from './../config/interfaces/salary.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignationService } from './../all_services/designation.service';
import { DepartmentService } from './../all_services/department.service';
import { SalaryService } from './../all_services/salary.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.scss']
})
export class SalaryManagementComponent implements OnInit {

  departments: any;
  designations: any;
  employees: any;
  salary = null;

  departmentId: string;
  designationId: string;
  employeeId: string;

  departmentName: string;
  designationName: string;
  employeeName: string;

  basicSalary = null;
  actionLabel = 'Update';
  initialChange = false;

  readOnlyValues: any;

  salaryForm: FormGroup;

  constructor(
    private salaryService: SalaryService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.setValueFromRoute();
    this.getSalaryInfo();
    this.getDepartments();
  }

  setValueFromRoute() {
    const routeObj = this.route.snapshot.queryParamMap;
    this.employeeId = routeObj.get('serial');
    this.departmentId = routeObj.get('deptSerial');
    this.designationId = routeObj.get('desgSerial');
    this.employeeName = routeObj.get('name');
    this.departmentName = routeObj.get('deptName');
    this.designationName = routeObj.get('desgName');
    // console.log(this.employeeId, this.departmentId, this.designationId);
  }

  sortDepartment() {
    let index = 0;
    let obj: any;
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i].department_name === this.departmentName) {
        index = i;
        obj = this.departments[i];
        break;
      }
    }
    this.departments.splice(index, 1);
    this.departments.splice(0, 0, obj);
    // console.log(this.departments);
  }

  setInitialDesignationAndEmployee() {
    this.designations = [
      {
        id: this.designationId,
        department_id: this.departmentId,
        designation: this.designationName,
      },
    ];
    this.employees = [
      {
        id: this.employeeId,
        full_name: this.employeeName,
      },
    ];
  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data[0].departments;
      this.sortDepartment();
      this.setInitialDesignationAndEmployee();
    });
  }

  getDesignations() {
    this.initialChange = true;
    this.departmentId = (document.getElementById('select_department') as HTMLInputElement).value;
    this.designationService.getDesignationsOfThisDepartment(this.departmentId).subscribe(data => {
      this.designations = data[0].designations;
    });
  }

  getEmployees() {
    this.initialChange = true;
    this.departmentId = (document.getElementById('select_department') as HTMLInputElement).value;
    this.designationId = (document.getElementById('select_designation') as HTMLInputElement).value;

    this.departmentService.getUserOfDeptXDesgY(this.departmentId, this.designationId).subscribe(data => {
      this.employees = data[0].users;
    });
  }

  getSalaryInfo() {
    if (this.departmentId !== this.route.snapshot.queryParamMap.get('deptSerial') ||
       this.designationId !== this.route.snapshot.queryParamMap.get('desgSerial')
    ) {
      this.employeeId = (document.getElementById('select_employee') as HTMLInputElement).value;
    }
    this.salaryService.getSalary(this.employeeId).subscribe(response => {
      if (response[0].status === 'OK') {
        this.actionLabel = 'Update';
        this.basicSalary = response[0].salary.basic_salary;
        this.updateObjects(response);
        // console.log(this.salary);
        // console.log(this.readOnlyValues);
      } else {
        this.actionLabel = 'Create';
        this.basicSalary = null;
        this.salary = null;
        this.readOnlyValues = null;
      }
    });
  }

  showSalary() {
    // console.log(this.salary);
    // console.log(this.readOnlyValues);
    const flag1 = this.salary != null;
    const flag2 = this.readOnlyValues != null;
    (document.getElementById('basic_salary') as HTMLInputElement).value = (flag1) ? this.salary.basic_salary : null;
    (document.getElementById('tax_deduction') as HTMLInputElement).value = (flag1) ? this.salary.tax_deduction : null;
    (document.getElementById('other_deduction') as HTMLInputElement).value = (flag1) ? this.salary.other_deduction : null;
    (document.getElementById('house_rent_allowance') as HTMLInputElement).value = (flag1) ? this.salary.house_rent_allowance : null;
    (document.getElementById('medical_allowance') as HTMLInputElement).value = (flag1) ? this.salary.medical_allowance : null;
    (document.getElementById('special_allowance') as HTMLInputElement).value = (flag1) ? this.salary.special_allowance : null;
    (document.getElementById('phone_bill_allowance') as HTMLInputElement).value = (flag1) ? this.salary.phone_bill_allowance : null;
    (document.getElementById('fuel_allowance') as HTMLInputElement).value = (flag1) ? this.salary.fuel_allowance : null;
    (document.getElementById('other_allowance') as HTMLInputElement).value = (flag1) ? this.salary.other_allowance : null;
    (document.getElementById('gross_salary') as HTMLInputElement).value = (flag2) ? this.readOnlyValues.gross_salary : null;
    (document.getElementById('total_deduction') as HTMLInputElement).value = (flag2) ? this.readOnlyValues.total_deduction : null;
    (document.getElementById('net_salary') as HTMLInputElement).value = (flag2) ? this.readOnlyValues.net_salary : null;
  }

  updateSalary() {

    if (! this.salary) {
      const data: Create = {
        user_id: this.employeeId,
        basic_salary: this.salaryForm.value.basic_salary,
        house_rent_allowance: this.salaryForm.value.house_rent_allowance,
        medical_allowance: this.salaryForm.value.medical_allowance,
        special_allowance: this.salaryForm.value.special_allowance,
        fuel_allowance: this.salaryForm.value.fuel_allowance,
        phone_bill_allowance: this.salaryForm.value.phone_bill_allowance,
        other_allowance: this.salaryForm.value.other_allowance,
        tax_deduction: this.salaryForm.value.tax_deduction,
        other_deduction: this.salaryForm.value.other_deduction,
      };
      this.salaryService.createSalary(data).subscribe(response => {
        if (! this.checkError(response[0])) {
          this.actionLabel = 'Update';
          alert('Salary created Succefully');
          this.updateObjects(response);
        }
      });
    } else {
      const value = (this.salaryForm.value.basic_salary.length > 0) ?
        this.salaryForm.value.basic_salary : this.basicSalary;
      const data: Update = {
        basic_salary: String(value),
        house_rent_allowance: this.salaryForm.value.house_rent_allowance,
        medical_allowance: this.salaryForm.value.medical_allowance,
        special_allowance: this.salaryForm.value.special_allowance,
        fuel_allowance: this.salaryForm.value.fuel_allowance,
        phone_bill_allowance: this.salaryForm.value.phone_bill_allowance,
        other_allowance: this.salaryForm.value.other_allowance,
        tax_deduction: this.salaryForm.value.tax_deduction,
        other_deduction: this.salaryForm.value.other_deduction,
      };
      this.salaryService.updateSalary(this.employeeId, data).subscribe(response => {
        if (! this.checkError(response[0])) {
          alert('Salary Updated Succefully');
          this.updateObjects(response);
        }
      });
    }

  }

  updateObjects(response: any) {
    this.salary = response[0].salary;
    this.readOnlyValues = {
      gross_salary: response[0].gross_salary,
      total_deduction: response[0].total_deduction,
      net_salary: response[0].net_salary,
    };
  }

  buildForm() {
    this.salaryForm = this.formBuilder.group({
      basic_salary: ['', [
          Validators.required,
          CustomValidators.containsDecimalNumber,
        ],
      ],

      house_rent_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      medical_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      fuel_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      special_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      phone_bill_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      other_allowance: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      tax_deduction: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      other_deduction: ['', [
          CustomValidators.containsDecimalNumber,
        ],
      ],

      gross_salary: [''],
      total_deduction: [''],
      net_salary: [''],

    });
  }

  get basic_salary() {
    return this.salaryForm.get('basic_salary');
  }

  get house_rent_allowance() {
    return this.salaryForm.get('house_rent_allowance');
  }

  get medical_allowance() {
    return this.salaryForm.get('medical_allowance');
  }

  get special_allowance() {
    return this.salaryForm.get('special_allowance');
  }

  get fuel_allowance() {
    return this.salaryForm.get('fuel_allowance');
  }

  get phone_bill_allowance() {
    return this.salaryForm.get('phone_bill_allowance');
  }

  get other_allowance() {
    return this.salaryForm.get('other_allowance');
  }

  get tax_deduction() {
    return this.salaryForm.get('tax_deduction');
  }

  get other_deduction() {
    return this.salaryForm.get('other_deduction');
  }

  checkOverAllBeforeLogin(credentials: any) {
    // console.log(credentials);
    this.salaryForm.setErrors({
      invalidLogin: true
    });
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      console.log(response.message);
      return true;
    }
    return false;
  }

}
