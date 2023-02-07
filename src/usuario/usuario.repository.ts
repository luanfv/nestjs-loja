import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  salvar(usuario) {
    this.usuarios.push(usuario);
  }

  listar() {
    return this.usuarios;
  }
}
