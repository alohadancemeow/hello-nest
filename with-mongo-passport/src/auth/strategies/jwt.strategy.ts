import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            // for web client
            // extract from cookie
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            secretOrKey: configService.get<string>('JWT_SECRET')!,
            ignoreExpiration: false,
        });

    }

    async validate(payload: any) {
        // This payload will be the decrypted token payload you provided when signing the token
        return { userId: payload.sub, email: payload.email };
    }
}