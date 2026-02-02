import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) { }

  /**
   * Create a new user
   * @param createUserDto - Data transfer object containing user details
   * @returns The created user document
   */
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * Find all users
   * @returns List of all user documents
   */
  async findAll() {
    return this.userModel.find().exec();
  }

  /**
   * Find a user by email
   * @param email - The email of the user to find
   * @returns The user document if found, otherwise null
   */
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  /**
   * Find a user by ID
   * @param id - The ID of the user
   * @returns The user document if found, otherwise null
   */
  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  /**
   * Create a new user from Google profile data
   * @param email - User's email from Google
   * @param name - User's name from Google
   * @param picture - URL of the user's profile picture
   * @param googleId - Unique Google ID
   * @returns The newly created user document
   */
  async createFromGoogle(email: string, name: string, picture: string, googleId: string) {
    const newUser = new this.userModel({
      email,
      name,
      picture,
      googleId,
    });
    return newUser.save();
  }

  /**
   * Update a user's information
   * @param id - The ID of the user to update
   * @param updateUserDto - Data transfer object containing updated details
   * @returns The updated user document
   * @throws NotFoundException if the user is not found
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  /**
   * Remove a user by ID
   * @param id - The ID of the user to remove
   * @returns The deleted user document
   * @throws NotFoundException if the user is not found
   */
  async remove(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findByIdAndDelete(id).exec();
  }
}
