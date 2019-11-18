
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  joining_date: string;
  // upper must be filled up, lowers are optional
  employee_id?: string;
  user_name?: string;
  date_of_birth?: string;
  fathers_name?: string;
  marital_status?: string;
  nationality?: string;
  permanent_address?: Text;
  present_address?: Text;
  passport_number?: string;
  company_id?: number;
  designation_id?: number;
  department_id?: number;
}

export interface Update {
  full_name?: string;
  email?: string;
  password?: string;
  gender?: string;
  phone?: number;
  joining_date?: string;
  employee_id?: string;
  user_name?: string;
  date_of_birth?: string;
  fathers_name?: string;
  marital_status?: string;
  nationality?: string;
  permanent_address?: Text;
  present_address?: Text;
  passport_number?: string;
  photo_path?: string;
  company_id?: number;
  designation_id?: number;
  department_id?: number;
  salary_id?: number;
  working_day_id?: number;
  verification_code?: number;
}

export interface UpdatePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface VerifyCode {
  email: string;
  verification_code: number;
}

export interface SetNewPassword {
  email: string;
  new_password: string;
  confirm_password: string;
}
