import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * Register a new user
   * @param createUserDto - User registration details
   * @returns The newly created user
   */
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Find a user by email address
   * @param email - The email address to search for
   * @returns The user details
   * @throws NotFoundException if user is not found
   */
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Get all users
   * @returns List of all users
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Get current user profile
   * @param req - The request object containing user info from JWT
   * @returns The authenticated user's profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return user;
  }

  /**
   * Find a user by ID
   * @param id - The unique ID of the user
   * @returns The user details
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Update a user's information
   * @param id - The ID of the user to update
   * @param updateUserDto - The updated information
   * @returns The updated user
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Delete a user
   * @param id - The ID of the user to delete
   * @returns The result of the deletion
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
