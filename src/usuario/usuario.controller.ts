import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() request) {
    this.usuarioRepository.salvar(request);
    return `Usuário criado: ${request.name}`;
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}
