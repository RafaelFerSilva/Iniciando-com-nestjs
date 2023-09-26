import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];
  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    return this.usuarios.some((usuario) => usuario.email === email);
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );
    if (!possivelUsuario) throw new Error('Usuário não existe');
    return possivelUsuario;
  }

  async atualiza(id: string, dadosDeAtualização: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);
    Object.entries(dadosDeAtualização).forEach(([chave, valor]) => {
      if (chave === 'id') return;
      usuario[chave] = valor;
    });
    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== usuario.id,
    );
    return usuario;
  }
}
