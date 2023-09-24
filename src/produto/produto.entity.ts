interface PropsCaracteristicas {
  nome: string;
  descricao: string;
}

interface PropsImagem {
  url: string;
  descricao: string;
}

export class ProdutoEntity {
  id: string;
  nome: string;
  valor: number;
  quantidadeDisponivel: number;
  descricao: string;
  caracteristicas: PropsCaracteristicas[];
  imagens: PropsImagem[];
  categoria: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  usuerId: string;
}
