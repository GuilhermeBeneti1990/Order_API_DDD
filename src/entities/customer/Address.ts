export default class Address {

    _street: string;
    _number: number;
    _zipCode: string;
    _city: string;

    constructor(street: string, number: number, zipCode: string, city: string) {
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;
        this.validate();
    }

    validate() {
        if (!this._street) {
            throw new Error('Street is required');
        }
        if (!this._number) {
            throw new Error('Number is required');
        }
        if (!this._zipCode) {
            throw new Error('Zip code is required');
        }
        if (!this._city) {
            throw new Error('City is required');
        }
    }

    toString() {
        return `Address: ${this._street}, ${this._number}, ${this._zipCode}, ${this._city}`;
    }
}