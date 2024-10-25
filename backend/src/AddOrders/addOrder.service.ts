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

  // async createAddorder(addorderDto: AddOrderDto) {
  //   const addorder = this.addorderRepository.create({ ...addorderDto});
  //   await this.addorderRepository.save(addorder);
  //     return { addorder }; 
  // }

  async createAddorder(addorderDto: AddOrderDto) {
    let existingOrder = await this.addorderRepository.findOne({
      where: { customerId: addorderDto.customerId },
    });
  
    const orderId = existingOrder ? existingOrder.orderId : await this.generateNewOrderId();
  
    const addorder = this.addorderRepository.create({ ...addorderDto, orderId });
    await this.addorderRepository.save(addorder);
  
    return { ...addorder, orderId };  // Ensure you return the orderId
  }
  
  
  // Helper method to generate a new orderId
  private async generateNewOrderId(): Promise<number> {
    const lastOrder = await this.addorderRepository.find({
      order: { orderId: 'DESC' },
      take: 1,
    });
    return lastOrder.length ? lastOrder[0].orderId + 1 : 1;
  }
  

  async findAll(): Promise<AddOrder[]> {
    return await this.addorderRepository.find();
  }

  async findOnebyID(id: number): Promise<AddOrder> {
    const addorder = await this.addorderRepository.findOne({ where: { id } }); 
    if (!addorder) {
      throw new NotFoundException(`product with orderID ${id} not found`);
    }
    return addorder;
  }

  async updateAddOrder(id: number, addorderDto: AddOrderDto): Promise<AddOrder> {
    const addorder = await this.addorderRepository.findOne({ where: { id } }); 
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
  
  async findOrdersByCustomerId(customerId: string): Promise<AddOrder[]> {
    return this.addorderRepository.find({ where: { customerId } });
  }
  

}