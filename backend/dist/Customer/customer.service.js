"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(customerDto) {
        const newCustomer = this.customerRepository.create(customerDto);
        return await this.customerRepository.save(newCustomer);
    }
    async findAll() {
        return await this.customerRepository.find();
    }
    async findOnebyID(Id) {
        const customer = await this.customerRepository.findOne({ where: { Id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with username ${Id} not found`);
        }
        return customer;
    }
    async updateCustomer(Id, customerDto) {
        const customer = await this.customerRepository.findOne({ where: { Id } });
        if (!customer) {
            throw new Error('Customer not found');
        }
        Object.assign(customer, customerDto);
        return this.customerRepository.save(customer);
    }
    async deleteCustomer(id) {
        const result = await this.customerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map