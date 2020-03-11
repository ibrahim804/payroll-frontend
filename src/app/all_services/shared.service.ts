import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SalarySheet } from '../config/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  dbColumnToXLColumn = {
    basic_salary: 'Basic Salary',
    house_rent_allowance: 'House Rent Allowance',
    medical_allowance: 'Medical Allowance', 
    special_allowance: 'Special Allowance',
    fuel_allowance: 'Fuel Allowance',
    phone_bill_allowance: 'Phone Bill Allowance',
    other_allowance: 'Other Allowance',
    tax_deduction: 'Tax Deduction',
    provident_fund: 'Monthly PF Deduction',
    other_deduction: 'Other Deduction',
    gross_salary: 'Gross Salary',
    total_deduction: 'Total Deduction',
    net_salary: 'Net Salary',
    unpaid_leave_taken: 'Unpaid Leave Taken',
    deduction_leave: 'Deduction For Leave',
    payable_amount: 'Payable Amount',
  };

  calculatePayableAmount(unpaidCount: any, grossSalary: any, netSalary: any) {
    return (netSalary - this.calculateLeaveDeduction(unpaidCount, grossSalary)).toFixed(2);
  }

  calculateLeaveDeduction(unpaidCount: any, grossSalary: any) {
    const deductionAmount: any = (grossSalary / 30) * unpaidCount;
    return deductionAmount.toFixed(2);
  }

  exportExcelSheet(jsonData: SalarySheet[], fileName: string) {  // type must be xlsx
    const ws: XLSX.WorkSheet = this.replaceDbColName(XLSX.utils.json_to_sheet(jsonData));
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  private replaceDbColName(obj: XLSX.WorkSheet) {
    obj.A1.v = this.dbColumnToXLColumn.basic_salary;
    obj.B1.v = this.dbColumnToXLColumn.house_rent_allowance;
    obj.C1.v = this.dbColumnToXLColumn.medical_allowance;
    obj.D1.v = this.dbColumnToXLColumn.special_allowance;
    obj.E1.v = this.dbColumnToXLColumn.fuel_allowance;
    obj.F1.v = this.dbColumnToXLColumn.phone_bill_allowance;
    obj.G1.v = this.dbColumnToXLColumn.other_allowance;
    obj.H1.v = this.dbColumnToXLColumn.tax_deduction;
    obj.I1.v = this.dbColumnToXLColumn.provident_fund;
    obj.J1.v = this.dbColumnToXLColumn.other_deduction;
    obj.K1.v = this.dbColumnToXLColumn.gross_salary;
    obj.L1.v = this.dbColumnToXLColumn.total_deduction;
    obj.M1.v = this.dbColumnToXLColumn.net_salary;
    obj.N1.v = this.dbColumnToXLColumn.unpaid_leave_taken;
    obj.O1.v = this.dbColumnToXLColumn.deduction_leave;
    obj.P1.v = this.dbColumnToXLColumn.payable_amount;
    return obj;
  }
}
