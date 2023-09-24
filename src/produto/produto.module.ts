import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ProdutoRepository } from './produto.repository';

@Module({
  imports: [UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
