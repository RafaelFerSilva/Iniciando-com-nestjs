import { MigrationInterface, QueryRunner } from 'typeorm';

export class relacionaPedidoItemPedido1697061039896
  implements MigrationInterface
{
  name = 'relacionaPedidoItemPedido1697061039896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_vendo" integer NOT NULL, "pedidoId" uuid, CONSTRAINT "PK_87738b80eb58b6e6ffd234dd4af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_pedido" ADD CONSTRAINT "FK_dd1fc6faef3559845d57da2828e" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_pedido" DROP CONSTRAINT "FK_dd1fc6faef3559845d57da2828e"`,
    );
    await queryRunner.query(`DROP TABLE "item_pedido"`);
  }
}
