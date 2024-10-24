import { Repository } from 'typeorm';
import { AddOrder } from './addOrder.entity';
import { AddOrderDto } from './addOrder.dto';
export declare class AddOrderService {
    private readonly addorderRepository;
    constructor(addorderRepository: Repository<AddOrder>);
    createAddorder(addorderDto: AddOrderDto): Promise<{
        addorder: AddOrder;
    }>;
    findAll(): Promise<AddOrder[]>;
    findOnebyID(orderId: number): Promise<AddOrder>;
    updateAddOrder(orderId: number, addorderDto: AddOrderDto): Promise<AddOrder>;
    deleteAddOrder(id: number): Promise<string>;
    deleteAllAddOrders(): Promise<string>;
}
