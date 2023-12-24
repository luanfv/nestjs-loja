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
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post()
  async criaUsuario(@Body() request: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.id = uuid();
    usuarioEntity.email = request.email;
    usuarioEntity.nome = request.nome;
    usuarioEntity.senha = request.senha;

    await this.usuarioService.criaUsuario(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioService.listaUsuario();
  }

  @Put(':id')
  async atualizaUsuario(
    @Param('id') id,
    @Body() dadosParaAtualizar: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
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
      const usuarioRemovido = this.removeUsuario(id);

      return {
        usuario: usuarioRemovido,
        mensagem: 'Usuário removido com sucesso',
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
