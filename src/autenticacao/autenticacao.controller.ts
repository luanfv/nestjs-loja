import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoDTO } from './autenticacao.dto';
import { HashSenhaPipe } from 'src/usuario/pipe/hashSenha.pipe';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(
    @Body() body: AutenticacaoDTO,
    @Body('senha', HashSenhaPipe) senhaComHash: string,
  ) {
    const { access_token } = await this.autenticacaoService.generateToken({
      email: body.email,
      senha: senhaComHash,
    });

    return {
      token: access_token,
    };
  }
}
