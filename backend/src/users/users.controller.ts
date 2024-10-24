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
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './user.dto'; // Import your DTO
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CustomLogger } from 'src/common/logger/logger.service';

@Controller('users')
  // @UseGuards(AuthGuard)

export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: CustomLogger
  ) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    const { user,  } = await this.usersService.create(userDto); // Destructure to get user and token
    return { user,  }; // Return user data and token
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOnebyID(+id); // Convert id to a number
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    this.logger.log(`sucessfully get all users`)
    return this.usersService.findAll();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<{ token: string }> {
    this.logger.log(`Login attempt for user: ${email}`); // Log attempt
    const user = await this.usersService.validateUserByEmail(email, password);
    if (user) {
      this.logger.log(`Login successful for user: ${email}`); 
    } else {
    }
  
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(+id);
  }
}
