import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repositories/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/findAll/findAll.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async(req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zipCode: req.body.address.zipCode
            }
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get("/", async(req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});