import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string; 

  @Column()
  totalQuantity: number;

  @Column()
  totalPrice: number;


}
