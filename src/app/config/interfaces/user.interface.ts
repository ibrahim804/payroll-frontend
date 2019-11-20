
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  joining_date: string;
  // upper must be filled up, lowers are optional
  employee_id?: string;
  user_name?: string;
  date_of_birth?: string;
  fathers_name?: string;
  marital_status?: string;
  nationality?: string;
  permanent_address?: string;
  present_address?: string;
  passport_number?: string;
  company_id?: string;
  designation_id?: string;
  department_id?: string;
}

export interface Update {
  full_name?: string;
  email?: string;
  password?: string;
  gender?: string;
  phone?: string;
  joining_date?: string;
  employee_id?: string;
  user_name?: string;
  date_of_birth?: string;
  fathers_name?: string;
  marital_status?: string;
  nationality?: string;
  permanent_address?: string;
  present_address?: string;
  passport_number?: string;
  photo_path?: string;
  company_id?: string;
  designation_id?: string;
  department_id?: string;
  salary_id?: string;
  working_day_id?: string;
  verification_code?: string;
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
  verification_code: string;
}

export interface SetNewPassword {
  email: string;
  new_password: string;
  confirm_password: string;
}
