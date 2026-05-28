export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: number;
  outstandingDebt: number;
  status: "Active" | "Inactive";
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  creditLimit: number;
  outstandingDebt: number;
  status: "Active" | "Inactive";
}
