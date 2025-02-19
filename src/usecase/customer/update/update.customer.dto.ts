export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    }
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    }
}