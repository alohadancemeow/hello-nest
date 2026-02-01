import { Controller, Post, UseGuards, Request, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';

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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // Initiates the Google OAuth process
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.googleLogin(req);

    // console.log('accessToken', accessToken);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect('/user/profile');
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res) {
    // Clear the access_token cookie
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
