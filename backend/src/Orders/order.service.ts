import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './order.dto';
import { OrderEntity } from './order.entity';


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(orderDto: OrderDto) {
    const order = this.orderRepository.create({ ...orderDto});
    await this.orderRepository.save(order);
      return { order }; 
  }

  async findAll(): Promise<OrderDto[]> {
    return await this.orderRepository.find();
  }

  async deleteOrder(id: number): Promise<string> {
    const result = await this.orderRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return `Order with ID ${id} deleted successfully`;

  }

}