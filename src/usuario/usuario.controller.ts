import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioCriado = await this.usuarioService.criaUsuario(dadosDoUsuario);
    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listarUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
        id,
        novosDados,
      );
      return {
        usuario: usuarioAtualizado,
        message: 'Usuario atualizado com sucesso',
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
      return {
        usuario: usuarioRemovido,
        message: 'Usuário removido com sucesso',
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
