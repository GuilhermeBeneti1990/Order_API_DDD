type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        number: number;
        city: string;
        zipCode: string;
    }
}

export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
    customers: Customer[];
}