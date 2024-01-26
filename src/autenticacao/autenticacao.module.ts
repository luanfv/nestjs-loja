import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: 'SENHA_SECRETA',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AutenticacaoService],
  controllers: [AutenticacaoController],
})
export class AutenticacaoModule {}
