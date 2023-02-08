import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  salvar(usuario: UsuarioEntity) {
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

  atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }

  remove(id: string) {
    const usuario = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );

    return usuario;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find((usuario) => usuario.id === id);

    if (!possivelUsuario) {
      throw new Error('Usuário não encontrado');
    }

    return possivelUsuario;
  }
}
