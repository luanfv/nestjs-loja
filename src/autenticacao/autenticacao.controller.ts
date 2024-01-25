import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoDTO } from './autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  @Post('login')
  async login(@Body() body: AutenticacaoDTO) {
    return {
      original: body,
    };
  }
}
