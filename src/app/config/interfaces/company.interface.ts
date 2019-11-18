
export interface Create {
  name: string;
  email: string;
  address: Text;
  country: string;
  phone?: number;
  website?: string;
}

export interface Update {
  name?: string;
  email?: string;
  address?: Text;
  country?: string;
  phone?: number;
  website?: string;
}
