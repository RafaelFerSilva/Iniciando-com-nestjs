import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('produto_caracteristicas')
export class ProdutoCaracteristica {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id: never;

  @Column({ name: 'nome', length: 100, nullable: true })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: true })
  descricao: string;
}
