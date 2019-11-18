
export interface Create {
  user_id: string;
  basic_salary: string;
  house_rent_allowance?: string;
  medical_allowance?: string;
  special_allowance?: string;
  fuel_allowance?: string;
  phone_bill_allowance?: string;
  other_allowance?: string;
  tax_deduction?: string;
  provident_fund?: string;
  other_deduction?: string;
}

export interface Update {
  basic_salary?: string;
  house_rent_allowance?: string;
  medical_allowance?: string;
  special_allowance?: string;
  fuel_allowance?: string;
  phone_bill_allowance?: string;
  other_allowance?: string;
  tax_deduction?: string;
  provident_fund?: string;
  other_deduction?: string;
}
