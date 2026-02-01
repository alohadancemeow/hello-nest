import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const token = await this.authService.login(req.user);

    // Set the access_token cookie
    res.cookie('access_token', token.access_token, { httpOnly: true });
    return { message: 'Login successful' };
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res) {
    // Clear the access_token cookie
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
