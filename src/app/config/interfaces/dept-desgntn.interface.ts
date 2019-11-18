
export interface CreateDept {
  department_name: string;
}

export interface UpdateDept {
  department_name?: string;
}

export interface CreateDesg {
  department_id: string;
  designation: string;
}

export interface UpdateDesg {
  designation: string;
}
