
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  // @IsNotEmpty()
  // @IsString()
  // orderId: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;

  @IsOptional() 
  price: number; 

}
