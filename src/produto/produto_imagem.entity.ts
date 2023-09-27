import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('produto_imagens')
export class ProdutoImagem {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @Column({ name: 'url', length: 100, nullable: true })
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: true })
  descricao: string;
}
