import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AutorizaUsuarioGuard } from './guards/autoriza-usuario.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || '',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AutenticacaoService, AutorizaUsuarioGuard],
  controllers: [AutenticacaoController],
})
export class AutenticacaoModule {}
