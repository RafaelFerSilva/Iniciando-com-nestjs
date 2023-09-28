import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto_caracteristicas')
export class ProdutoCaracteristica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: true })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: true })
  descricao: string;
}
