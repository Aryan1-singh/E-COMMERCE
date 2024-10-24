import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { OrderDto } from './order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(orderDto: OrderDto): Promise<{
        order: OrderEntity;
    }>;
    findAll(): Promise<OrderDto[]>;
    deleteOrder(id: number): Promise<string>;
}
