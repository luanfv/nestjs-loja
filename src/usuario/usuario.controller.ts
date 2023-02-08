import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() request: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(request);
    return `Usuário criado: ${request.nome}`;
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}
