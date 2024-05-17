import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  login(@Body() {email, password}: AuthenticationDto) {
    return this.authenticationService.loginService(email, password);
  }
}
