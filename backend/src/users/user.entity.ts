import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string; 

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
