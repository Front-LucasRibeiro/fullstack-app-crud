import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async loginService(email: string, password: string) {
    const user = await this.userService.searchByEmail(email);
    
    const userAuthenticate = await bcrypt.compare(
      password,
      user.password
    );

    if (!userAuthenticate) {
      throw new UnauthorizedException('O email ou a senha estão incorretos.');
    } 

    const payload: UserPayload = {
      sub: user.id,
      username: user.name
    };

    return {
      token_access: await this.jwtService.signAsync(payload),
    }

  }
}
