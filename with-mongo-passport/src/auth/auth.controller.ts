import { Controller, Post, UseGuards, Request, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Login with email and password
   * @param req - Request object containing user (injected by LocalAuthGuard)
   * @param res - Response object to set cookie
   * @returns JSON response with message
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const token = await this.authService.login(req.user);

    // Set the access_token cookie
    res.cookie('access_token', token.access_token, { httpOnly: true });
    return { message: 'Login successful' };
  }

  /**
   * Initiate Google OAuth login
   * The function body is empty because the GoogleAuthGuard handles the redirection to Google.
   * GET /auth/google --> GoogleAuthGuard --> GoogleStrategy
   * @param req - Request object
   */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }

  /**
   * Handle Google OAuth callback
   * @param req - Request object containing Google user info
   * @param res - Response object to set cookie and redirect
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.googleLogin(req);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect('/user/profile');
  }

  /**
   * Logout user
   * @param req - Request object
   * @param res - Response object to clear cookie
   * @returns JSON response with message
   */
  @Post('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res) {
    // Clear the access_token cookie
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
