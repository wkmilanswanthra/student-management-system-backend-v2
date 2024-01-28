import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  dateOfBirth: Timestamp;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 50 })
  created_at: Timestamp;

  @Column({ length: 50 })
  updated_at: Timestamp;
}
