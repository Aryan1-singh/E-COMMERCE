import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
 
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { OrderEntity } from './order.entity';
  import { OrderDto } from './order.dto';


  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly orderService: OrderService,
    ) {}

    @Post()
    async createOrder(@Body() orderDto: OrderDto) {
      return this.orderService.createOrder(orderDto);
    }

     
    @Get()
    findAll(): Promise<OrderDto[]> {
      return this.orderService.findAll();
    }
  
    @Delete(':id')
    async deleteOrder(@Param('id') id: number): Promise<string> {
      return this.orderService.deleteOrder(id);
    }

}
