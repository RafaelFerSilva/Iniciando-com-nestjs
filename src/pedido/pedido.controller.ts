import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedidoDto';
import { AtualizaPedidoDto } from './dto/AtualizaPedidoDto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos;
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
  }
}
