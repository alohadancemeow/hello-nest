import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "src/users/entities/user.entity";
import { Post } from "src/posts/entities/post.entity";

export const mysql = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') ?? '3306', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Post],
        synchronize: configService.get('NODE_ENV') !== 'production',
    }),
}
