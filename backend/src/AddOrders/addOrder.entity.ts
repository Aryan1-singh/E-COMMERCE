import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('add_order')
export class AddOrder {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  productName: string; 

  @Column()
  quantity: number;

  @Column()
  price: number;


}
