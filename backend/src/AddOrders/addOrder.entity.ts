import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('add_order')
export class AddOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string; 
  
  @Column()
  orderId: number;

  @Column()
  productName: string; 

  @Column()
  quantity: number;

  @Column()
  price: number;


}
