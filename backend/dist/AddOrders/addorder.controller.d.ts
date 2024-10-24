import { AddOrderService } from './addOrder.service';
import { AddOrder } from './addOrder.entity';
import { AddOrderDto } from './addOrder.dto';
export declare class AddOrderController {
    private readonly addorderService;
    constructor(addorderService: AddOrderService);
    createAddOrder(addorderDto: AddOrderDto): Promise<{
        addorder: AddOrder;
    }>;
    findAll(): Promise<AddOrder[]>;
    findOne(id: number): Promise<AddOrder>;
    updateUser(id: string, updateAddorderDto: AddOrder): Promise<AddOrder>;
    deleteOrder(id: number): Promise<string>;
    deleteAllOrders(): Promise<string>;
}
