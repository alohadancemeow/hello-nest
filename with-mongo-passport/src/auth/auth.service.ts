import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  /**
   * Validate a user by email and password
   * @param email - User's email
   * @param password - User's password
   * @returns User object without password if validation succeeds, null otherwise
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

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

  /**
   * Generate JWT token for login
   * @param user - User object
   * @returns Object containing access_token
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id || user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Handle Google Login
   * @param req - Request object containing Google user info
   * @returns Object containing access_token
   * @throws Error if Google user info is missing
   */
  async googleLogin(req): Promise<any> {
    if (!req.user) {
      throw new Error('Google login failed: No user information received.');
    }

    const { email, name, picture, googleId } = req.user;
    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.createFromGoogle(email, name, picture, googleId);
    }

    const payload = { email: user.email, sub: user._id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
