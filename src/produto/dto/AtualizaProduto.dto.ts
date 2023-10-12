import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './CriarProduto.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}
