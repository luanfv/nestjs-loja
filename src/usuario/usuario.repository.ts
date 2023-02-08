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

  existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return !!possivelUsuario;
  }
}
