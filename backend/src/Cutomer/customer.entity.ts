import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  fullName: string; 

  @Column()
  address: string;

  @Column({ type: 'bigint' }) // Change to bigint
  contactDetail: number; // Keep as number

}
