import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity]), // Import RoleEntity into TypeOrmModule
      ],
  controllers: [OrderController],
  providers: [ OrderService],
    exports: [OrderService], 
  
})
export class OrderModule {}