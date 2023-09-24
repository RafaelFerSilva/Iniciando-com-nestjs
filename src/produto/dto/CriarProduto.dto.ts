import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazia' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazia' })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
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
  dataCriacao: Date;

  @IsNotEmpty({ message: 'A data de atualização não pode estar vazia' })
  dataAtualizacao: Date;

  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuerId: string;
}
