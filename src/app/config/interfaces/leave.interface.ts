
export interface CreateCategory {
  leave_type: string;
}

export interface UpdateCategory {
  leave_type: string;
}

export interface CreateCount {
  user_id: string;
  leave_category_id: string;
  leave_left: string;
}

export interface UpdateCount {
  leave_left?: string;
}

export interface CreateLeave {
  leave_category_id: string;
  leave_description: string;
  start_date: string;
  end_date: string;
}

export interface UpdateLeave {
  leave_category_id?: string;
  leave_description?: string;
  start_date?: string;
  end_date?: string;
}

export interface ApproveLeave {
  decision: string;
}
