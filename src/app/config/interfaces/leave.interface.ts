
export interface CreateCategory {
  leave_type: string;
}

export interface UpdateCategory {
  leave_type: string;
}

export interface CreateCount {
  user_id: number;
  leave_category_id: number;
  leave_left: number;
}

export interface UpdateCount {
  leave_left?: number;
}

export interface CreateLeave {
  leave_category_id: number;
  leave_description: Text;
  start_date: string;
  end_date: string;
}

export interface UpdateLeave {
  leave_category_id?: number;
  leave_description?: Text;
  start_date?: string;
  end_date?: string;
}

export interface ApproveLeave {
  decision: number;
}
