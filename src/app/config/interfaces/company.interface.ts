
export interface Create {
  name: string;
  email: string;
  address: string;
  country: string;
  phone?: string;
  website?: string;
}

export interface Update {
  name?: string;
  email?: string;
  address?: string;
  country?: string;
  phone?: string;
  website?: string;
}
