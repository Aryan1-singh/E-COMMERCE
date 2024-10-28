import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerDto } from './customer.dto';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    create(customerDto: CustomerDto): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
    findOnebyID(Id: number): Promise<CustomerEntity>;
    updateCustomer(Id: number, customerDto: CustomerDto): Promise<CustomerEntity>;
    deleteCustomer(id: number): Promise<void>;
}
