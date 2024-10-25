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
exports.AddOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const addOrder_entity_1 = require("./addOrder.entity");
let AddOrderService = class AddOrderService {
    constructor(addorderRepository) {
        this.addorderRepository = addorderRepository;
    }
    async createAddorder(addorderDto) {
        let existingOrder = await this.addorderRepository.findOne({
            where: { customerId: addorderDto.customerId },
        });
        const orderId = existingOrder ? existingOrder.orderId : await this.generateNewOrderId();
        const addorder = this.addorderRepository.create({ ...addorderDto, orderId });
        await this.addorderRepository.save(addorder);
        return { ...addorder, orderId };
    }
    async generateNewOrderId() {
        const lastOrder = await this.addorderRepository.find({
            order: { orderId: 'DESC' },
            take: 1,
        });
        return lastOrder.length ? lastOrder[0].orderId + 1 : 1;
    }
    async findAll() {
        return await this.addorderRepository.find();
    }
    async findOnebyID(id) {
        const addorder = await this.addorderRepository.findOne({ where: { id } });
        if (!addorder) {
            throw new common_1.NotFoundException(`product with orderID ${id} not found`);
        }
        return addorder;
    }
    async updateAddOrder(id, addorderDto) {
        const addorder = await this.addorderRepository.findOne({ where: { id } });
        if (!addorder) {
            throw new Error('Product not found');
        }
        Object.assign(addorder, addorderDto);
        return this.addorderRepository.save(addorder);
    }
    async deleteAddOrder(id) {
        const result = await this.addorderRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return `Order with ID ${id} deleted successfully`;
    }
    async deleteAllAddOrders() {
        await this.addorderRepository.clear();
        return 'All orders deleted successfully';
    }
    async findOrdersByCustomerId(customerId) {
        return this.addorderRepository.find({ where: { customerId } });
    }
};
exports.AddOrderService = AddOrderService;
exports.AddOrderService = AddOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(addOrder_entity_1.AddOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddOrderService);
//# sourceMappingURL=addOrder.service.js.map