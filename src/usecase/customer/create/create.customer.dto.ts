export interface InputCreateCustomerDto {
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

export interface OutputCreateCustomerDto {
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