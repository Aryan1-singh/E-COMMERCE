import { Repository } from 'typeorm';
import { AddOrder } from './addOrder.entity';
import { AddOrderDto } from './addOrder.dto';
export declare class AddOrderService {
    private readonly addorderRepository;
    constructor(addorderRepository: Repository<AddOrder>);
    createAddorder(addorderDto: AddOrderDto): Promise<{
        orderId: number;
        id: number;
        customerId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    private generateNewOrderId;
    findAll(): Promise<AddOrder[]>;
    findOnebyID(id: number): Promise<AddOrder>;
    updateAddOrder(id: number, addorderDto: AddOrderDto): Promise<AddOrder>;
    deleteAddOrder(id: number): Promise<string>;
    deleteAllAddOrders(): Promise<string>;
    findOrdersByCustomerId(customerId: string): Promise<AddOrder[]>;
}
