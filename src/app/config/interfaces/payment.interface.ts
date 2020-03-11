
export interface Create {
  user_id: string;
  employee_monthly_cost: string;
  payable_amount: string;
}

export interface SendMail {
  user_id: string;
  unpaid_leave_count?: string;
}

export interface SalarySheet {
  basic_salary: string;
  house_rent_allowance: string;
  medical_allowance: string;
  special_allowance: string;
  fuel_allowance: string;
  phone_bill_allowance: string;
  other_allowance: string;
  tax_deduction: string;
  provident_fund: string;
  other_deduction: string;
  gross_salary: string;
  total_deduction: string;
  net_salary: string;
  unpaid_leave_taken: string;
  deduction_leave: string;
  payable_amount: string;
}