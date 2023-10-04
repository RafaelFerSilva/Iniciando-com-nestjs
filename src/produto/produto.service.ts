import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    const produto = await this.produtoRepository.save(produtoEntity);

    return produto;
  }

  async listaProdutos() {
    const produtos = await this.produtoRepository.find();
    return produtos;
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }

  async atualizarProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
    await this.produtoRepository.update(id, produtoEntity);
  }
}
