import { Repository } from 'typeorm';
import { OrderDto } from './order.dto';
import { OrderEntity } from './order.entity';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    createOrder(orderDto: OrderDto): Promise<{
        order: OrderEntity;
    }>;
    findAll(): Promise<OrderDto[]>;
    deleteOrder(id: number): Promise<string>;
}
