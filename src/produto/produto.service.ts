import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { CriaProdutoDTO } from './dto/CriarProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
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

    return this.produtoRepository.save(produtoEntity);
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
