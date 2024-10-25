import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomersController } from './customer.controller';
import { CustomerService } from './customer.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerEntity]), // Import RoleEntity into TypeOrmModule
      ],
  controllers: [CustomersController],
  providers: [ CustomerService],
    exports: [CustomerService], 
  
})
export class CustomerModule {}
