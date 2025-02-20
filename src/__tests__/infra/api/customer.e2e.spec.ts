import { app, sequelize } from "../../../infra/api/express";
import request from "supertest";

describe("Customer E2E tests", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                email: "john@email.com",
                phone: "123-456",
                address: {
                    street: "Street",
                    number: 123,
                    city: "City",
                    zipCode: "1234-567"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.email).toBe("john@email.com");
        expect(response.body.phone).toBe("123-456");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe(123);
        // expect(response.body.address.city).toBe("City");
        // expect(response.body.address.zipCode).toBe("1234-567");
    });

    it('should throw a status 500 if customer is not created', async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John"
            });

        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                email: "john@email.com",
                phone: "123-456",
                address: {
                    street: "Street",
                    number: 123,
                    city: "City",
                    zipCode: "1234-567"
                }
            });

        expect(response.status).toBe(200);

        const response02 = await request(app)
            .post("/customers")
            .send({
                name: "Jaine",
                email: "jaine@email.com",
                phone: "123-456",
                address: {
                    street: "Street",
                    number: 123,
                    city: "City",
                    zipCode: "1234-567"
                }
            });

        expect(response02.status).toBe(200);

        const listResponse = await request(app)
            .get("/customers")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0].name).toBe("John");
        expect(listResponse.body.customers[1].name).toBe("Jaine");
    });

});