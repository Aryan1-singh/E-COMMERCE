import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddOrderController } from './addOrder.controller';
import { AddOrderService } from './addOrder.service';
import { AddOrder } from './addOrder.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([AddOrder]), // Import RoleEntity into TypeOrmModule
      ],
  controllers: [AddOrderController],
  providers: [ AddOrderService],
    exports: [AddOrderService], 
  
})
export class AddOrderModule {}
