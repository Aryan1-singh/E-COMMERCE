import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  totalQuantity: number;

  @IsOptional() 
  totalPrice: number; 

}
