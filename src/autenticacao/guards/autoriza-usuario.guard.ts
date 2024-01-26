import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IUsuarioJWT } from 'src/utils/jwt/usuario.jwt';

@Injectable()
export class AutorizaUsuarioGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization ?? '';

    const [type, token] = authorization.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new UnauthorizedException(
        'Autorização precisa ser um Bearer Token',
      );
    }

    const user: IUsuarioJWT = await this.jwtService
      .verifyAsync<IUsuarioJWT>(token)
      .catch(() => null);

    if (!user) {
      throw new UnauthorizedException('JWT inválido');
    }

    request.query.usuarioId = user.sub;

    return true;
  }
}
