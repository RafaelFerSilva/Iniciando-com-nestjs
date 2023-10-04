import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProdutoCaracteristicaEntity } from '../produto_caracteristica.entity';
import { ProdutoImagemEntity } from '../produto_imagem.entity';

export class AtualizaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do produto deve ter duas casas decimais' },
  )
  @IsPositive({ message: 'O valor do produto não pode ser negativo' })
  @Min(1, { message: 'O valor do produto não pode ser 0' })
  @IsOptional()
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
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProdutoCaracteristicaEntity)
  @IsOptional()
  caracteristicas: ProdutoCaracteristicaEntity[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProdutoImagemEntity)
  @IsOptional()
  imagens: ProdutoImagemEntity[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria não pode estar vazia' })
  @IsOptional()
  categoria: string;

  @IsNotEmpty({ message: 'A data de criação não pode estar vazia' })
  @IsOptional()
  dataCriacao: Date;

  @IsNotEmpty({ message: 'A data de atualização não pode estar vazia' })
  @IsOptional()
  dataAtualizacao: Date;

  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuerId: string;
}
