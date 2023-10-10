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
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criarProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoCadastrado =
      await this.produtoService.criaProduto(dadosDoProduto);

    return {
      produto: produtoCadastrado.nome,
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
