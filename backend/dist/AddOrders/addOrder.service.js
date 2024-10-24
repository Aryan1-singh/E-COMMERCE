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
        const addorder = this.addorderRepository.create({ ...addorderDto });
        await this.addorderRepository.save(addorder);
        return { addorder };
    }
    async findAll() {
        return await this.addorderRepository.find();
    }
    async findOnebyID(orderId) {
        const addorder = await this.addorderRepository.findOne({ where: { orderId } });
        if (!addorder) {
            throw new common_1.NotFoundException(`product with orderID ${orderId} not found`);
        }
        return addorder;
    }
    async updateAddOrder(orderId, addorderDto) {
        const addorder = await this.addorderRepository.findOne({ where: { orderId } });
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
};
exports.AddOrderService = AddOrderService;
exports.AddOrderService = AddOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(addOrder_entity_1.AddOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddOrderService);
//# sourceMappingURL=addOrder.service.js.map