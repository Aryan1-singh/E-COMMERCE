// src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { CustomerService } from './customer.service';
  import { CustomerEntity } from './customer.entity';
  import { CustomerDto } from './customer.dto';

  
  @Controller('customer')
  
  export class CustomersController {
    constructor(
      private readonly customerService: CustomerService,
    ) {}
  
 
  
    @Get()
    findAll(): Promise<CustomerEntity[]> {
      return this.customerService.findAll();
    }
  
 
    
  }
  