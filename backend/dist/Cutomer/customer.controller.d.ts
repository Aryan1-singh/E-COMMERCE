import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
export declare class CustomersController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(): Promise<CustomerEntity[]>;
}
