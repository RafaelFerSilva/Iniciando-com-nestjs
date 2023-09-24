import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriarProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { v4 as uuid } from 'uuid';

@Controller('/produtos')
export class ProdutoController {
  private produtoRepository = new ProdutoRepository();

  @Post()
  async criarProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuid();
    produtoEntity.usuerId = dadosDoProduto.usuerId;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.dataAtualizacao = dadosDoProduto.dataAtualizacao;
    produtoEntity.dataCriacao = dadosDoProduto.dataAtualizacao;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.quantidadeDisponivel - dadosDoProduto.quantidadeDisponivel;
    produtoEntity.valor = dadosDoProduto.valor;
    this.produtoRepository.salvar(produtoEntity);
    return dadosDoProduto;
  }

  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }

  @Put('/:id')
  async atualizarProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO,
  ) {
    try {
      const produtoAtualizado = await this.produtoRepository.atualiza(
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
      const produtoRemovido = await this.produtoRepository.remove(id);
      return {
        produto: produtoRemovido,
        message: 'Produto removido com sucesso',
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
