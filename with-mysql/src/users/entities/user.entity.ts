
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // relation with post
    @OneToMany(() => Post, (post) => post.author, {
        cascade: true, // If set to true, the related object will be inserted and updated in the database. 
    })
    // @JoinTable({ name: 'user_posts', joinColumn: { name: 'userId' }, inverseJoinColumn: { name: 'postId' } })
    posts: Post[];
}

