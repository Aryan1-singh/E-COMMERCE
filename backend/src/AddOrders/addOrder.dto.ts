
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: number;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;

  @IsOptional() 
  price: number; 

}
