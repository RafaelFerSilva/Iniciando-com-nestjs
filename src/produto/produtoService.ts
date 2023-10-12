import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { CriaProdutoDTO } from './dto/CriarProduto.dto';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    Object.assign(produtoEntity, dadosDoProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    const produtoLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtoLista;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }
    Object.assign(entityName, novosDados as ProdutoEntity);
    return await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);
    if (!resultado.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }
}
