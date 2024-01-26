import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { IUsuarioJWT } from '../utils/jwt/usuario.jwt';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(input: { email: string; senha: string }) {
    const usuarioEncontrado = await this.usuarioService.buscaPorEmail(
      input.email,
    );

    if (!usuarioEncontrado || usuarioEncontrado?.senha !== input.senha) {
      throw new UnauthorizedException('E-mail ou senha incorreto');
    }

    const payload: IUsuarioJWT = {
      sub: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
