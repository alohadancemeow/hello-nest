import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const decodedPassword = await bcrypt.compare(password, user.password);
    if (user && decodedPassword) {
      const result = user.toObject()
      return {
        id: result._id,
        email: result.email,
        name: result.name,
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async logout(user: any) {
  //   return user;
  // }
}
