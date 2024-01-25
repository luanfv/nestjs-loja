import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoDTO } from './autenticacao.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HashSenhaPipe } from 'src/usuario/pipe/hashSenha.pipe';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  async login(
    @Body() body: AutenticacaoDTO,
    @Body('senha', HashSenhaPipe) senha: string,
  ) {
    const usuario = await this.usuarioService.buscaPorEmail(body.email);

    if (usuario?.senha !== senha) {
      throw new UnauthorizedException('E-mail ou senha incorreto');
    }

    return {
      original: body,
      transform: usuario,
    };
  }
}
