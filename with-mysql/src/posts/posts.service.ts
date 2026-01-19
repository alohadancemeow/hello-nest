import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) { }

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.save(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number) {

    try {
      const post = await this.postsRepository.findOne({
        where: {
          id,
        },
        relations: ['author'],
      });

      if (!post) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      return post;
    } catch (error) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // Check if the post exists
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    // check for auther 
    if (post.authorId !== updatePostDto.authorId) {
      throw new UnauthorizedException(`You are not authorized to update this post`);
    }

    try {
      const result = await this.postsRepository.update(id, updatePostDto);

      if (!result.affected) {
        throw new InternalServerErrorException(`Post with id ${id} not updated`);
      }

      return {
        message: `Post with id ${id} updated`,
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number, deletePostDto: DeletePostDto) {
    try {
      const result = await this.postsRepository.findOne({
        where: {
          id,
        },
      });

      if (!result) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      // check for auther 
      if (result.authorId !== deletePostDto.authorId) {
        throw new UnauthorizedException(`You are not authorized to delete this post`);
      }

      await this.postsRepository.delete(id);

      return {
        message: `Post with id ${id} deleted`,
      }

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
