import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(correo: string) {
  if (correo === 'test@parknear.com') {
    return {
      documento_identidad: '1234567890',
      correo: 'test@parknear.com',
      rol: 'CONDUCTOR',
    };
  }
  return null;
}
   
  async login(user: any) {
  if (!user) {
    throw new UnauthorizedException('Usuario no válido');
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