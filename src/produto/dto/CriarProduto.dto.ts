import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProdutoEntity } from '../produto.entity';
import { DeleteDateColumn } from 'typeorm';

export class CaracteristicaProdutoDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da caracteristica não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da caracteristica não pode ser vazio' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: string;

  @IsUrl(undefined, { message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do produto deve ter duas casas decimais' },
  )
  @IsPositive({ message: 'O valor do produto não pode ser negativo' })
  @Min(1, { message: 'O valor do produto não pode ser 0' })
  valor: number;

  @IsNumber()
  @IsPositive()
  @Min(0, { message: 'O valor da quantidade não pode ser negativo' })
  @IsOptional()
  quantidadeDisponivel: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria não pode estar vazia' })
  categoria: string;

  @IsNotEmpty({ message: 'A data de criação não pode estar vazia' })
  dataCriacao: string;

  @IsNotEmpty({ message: 'A data de atualização não pode estar vazia' })
  dataAtualizacao: string;

  @DeleteDateColumn({ name: 'deleted' })
  deletedAt: string;
}
