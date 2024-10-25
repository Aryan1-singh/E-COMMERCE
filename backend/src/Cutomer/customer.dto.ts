
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsInt() // Ensure it’s an integer
  @Matches(/^\d{10}$/, { message: 'contactDetail must be a 10-digit number' }) // Regex to validate 10-digit number
  contactDetail: number;
  

}
