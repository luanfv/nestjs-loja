import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuariosRepository: Repository<UsuarioEntity>,
  ) {}

  async listaUsuario(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuariosRepository.find();

    return usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
  }

  async criaUsuario(usuario: UsuarioEntity) {
    this.usuariosRepository.save(usuario);
  }

  async atualizaUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
    await this.usuariosRepository.update(id, usuarioEntity);
  }

  async removeUsuario(id: string) {
    await this.usuariosRepository.delete(id);
  }
}
