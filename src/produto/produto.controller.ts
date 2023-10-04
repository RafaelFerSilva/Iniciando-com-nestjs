import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriarProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';
import { v4 as uuid } from 'uuid';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criarProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.usuerId = dadosDoProduto.usuerId;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.updatedAt = dadosDoProduto.dataAtualizacao;
    produtoEntity.createAt = dadosDoProduto.dataCriacao;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.quantidadeDisponivel - dadosDoProduto.quantidadeDisponivel;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.imagens = dadosDoProduto.imagens;
    const produtoCriado = await this.produtoService.criaProduto(produtoEntity);
    return {
      produto: produtoCriado.nome,
      message: 'Produto criado com sucesso',
    };
  }

  @Get()
  async listarProdutos() {
    return await this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizarProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO,
  ) {
    try {
      const produtoAtualizado = await this.produtoService.atualizarProduto(
        id,
        novosDados,
      );
      return {
        produto: produtoAtualizado,
        message: 'Produto atualizado com sucesso',
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    try {
      const produtoRemovido = await this.produtoService.deletaProduto(id);
      return {
        produto: produtoRemovido,
        message: 'Produto removido com sucesso',
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
