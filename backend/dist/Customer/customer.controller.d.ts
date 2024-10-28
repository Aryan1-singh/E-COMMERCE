import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { CustomerDto } from './customer.dto';
export declare class CustomersController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    createCustomer(customerDto: CustomerDto): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
    findOne(id: number): Promise<CustomerEntity>;
    updateUser(id: string, updateUserDto: CustomerDto): Promise<CustomerEntity>;
    deleteCustomer(id: string): Promise<void>;
}
