import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() request: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.id = uuid();
    usuarioEntity.email = request.email;
    usuarioEntity.nome = request.nome;
    usuarioEntity.senha = request.senha;

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  @Put(':id')
  async atualizaUsuario(
    @Param('id') id,
    @Body() dadosParaAtualizar: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = this.usuarioRepository.atualiza(
        id,
        dadosParaAtualizar,
      );

      return {
        usuario: usuarioAtualizado,
        mensagem: 'Usuário atualizado com sucesso',
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = this.usuarioRepository.remove(id);

      return {
        usuario: usuarioRemovido,
        mensagem: 'Usuário removido com sucesso',
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
