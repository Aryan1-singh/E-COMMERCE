import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
 
  } from '@nestjs/common';
  import { AddOrderService } from './addOrder.service';
  import { AddOrder } from './addOrder.entity';
  import { AddOrderDto } from './addOrder.dto';


  @Controller('product')
  export class AddOrderController {
    constructor(
      private readonly addorderService: AddOrderService,
    ) {}

    @Post()
    async createAddOrder(@Body() addorderDto: AddOrderDto) {
      return this.addorderService.createAddorder(addorderDto);
    }

    @Get()
    findAll(): Promise<AddOrder[]> {
      return this.addorderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number):Promise<AddOrder>{
      return this.addorderService.findOnebyID(+id);
    }

    @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateAddorderDto: AddOrder,
  ): Promise<AddOrder> {
    return this.addorderService.updateAddOrder(+id, updateAddorderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<string> {
    return this.addorderService.deleteAddOrder(id);
  }

  @Delete()
async deleteAllOrders(): Promise<string> {
  return this.addorderService.deleteAllAddOrders();
}

@Get('/orderitem/:customerId')
async findOrdersByCustomerId(@Param('customerId') customerId: string): Promise<AddOrder[]> {
  return this.addorderService.findOrdersByCustomerId(customerId);
}



}
