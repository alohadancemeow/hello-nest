import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "src/users/entities/user.entity";

export const mysql = {
    import: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') ?? '3306', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User],
        synchronize: configService.get('NODE_ENV') !== 'production',
    }),
}
