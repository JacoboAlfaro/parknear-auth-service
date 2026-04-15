import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()

export class AuthService {
  constructor(
  private jwtService: JwtService,
  private httpService: HttpService,
) {}

  async validateUser(correo: string) {
  try {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/users/${correo}`)
    );

    return response.data;

  } 
  catch (error) {
    return null;
  }
}
   
  async login(user: any) {
  if (!user) {
    throw new UnauthorizedException('Usuario no valido');
  }

  const payload = {
    sub: user.documento_identidad,
    correo: user.correo,
    rol: user.rol,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}