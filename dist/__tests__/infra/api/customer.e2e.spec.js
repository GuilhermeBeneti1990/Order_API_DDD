"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("../../../infra/api/express");
const supertest_1 = __importDefault(require("supertest"));
describe("Customer E2E tests", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield express_1.sequelize.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield express_1.sequelize.close();
    }));
    it('should create a customer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(express_1.app)
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
    }));
    it('should throw a status 500 if customer is not created', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(express_1.app)
            .post("/customers")
            .send({
            name: "John"
        });
        expect(response.status).toBe(500);
    }));
    it('should list all customers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(express_1.app)
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
        const response02 = yield (0, supertest_1.default)(express_1.app)
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
        const listResponse = yield (0, supertest_1.default)(express_1.app)
            .get("/customers")
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0].name).toBe("John");
        expect(listResponse.body.customers[1].name).toBe("Jaine");
    }));
});
