import { User } from "src/users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinTable } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column()
    authorId: number;

    // relation with user
    @ManyToOne(() => User, (user) => user.posts)
    author: User;
}
