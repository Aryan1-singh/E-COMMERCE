import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    findAll(): Promise<CustomerEntity[]>;
}
