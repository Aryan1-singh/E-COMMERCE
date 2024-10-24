import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOrder } from './addOrder.entity';
import { AddOrderDto } from './addOrder.dto';


@Injectable()
export class AddOrderService {

  constructor(
    @InjectRepository(AddOrder)
    private readonly addorderRepository: Repository<AddOrder>,
  ) {}

  async createAddorder(addorderDto: AddOrderDto) {
    const addorder = this.addorderRepository.create({ ...addorderDto});
    await this.addorderRepository.save(addorder);
      return { addorder }; 
  }

  async findAll(): Promise<AddOrder[]> {
    return await this.addorderRepository.find();
  }

  async findOnebyID(orderId: number): Promise<AddOrder> {
    const addorder = await this.addorderRepository.findOne({ where: { orderId } }); 
    if (!addorder) {
      throw new NotFoundException(`product with orderID ${orderId} not found`);
    }
    return addorder;
  }

  async updateAddOrder(orderId: number, addorderDto: AddOrderDto): Promise<AddOrder> {
    const addorder = await this.addorderRepository.findOne({ where: { orderId } }); 
    if (!addorder) {
      throw new Error('Product not found'); 
    }
    Object.assign(addorder, addorderDto);
    return this.addorderRepository.save(addorder); 
  }

  async deleteAddOrder(id: number): Promise<string> {
    const result = await this.addorderRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return `Order with ID ${id} deleted successfully`;

  }

  async deleteAllAddOrders(): Promise<string> {
    await this.addorderRepository.clear();  // No need to store result, just await
    return 'All orders deleted successfully';
  }
  

}