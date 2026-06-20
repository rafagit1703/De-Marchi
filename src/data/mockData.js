export const LOJA_INFO = {
  nome: 'Agro De Marchi - Matriz',
  endereco: 'Rodovia PR-180, Km 2, Zona Rural, Francisco Beltrão - PR',
  horario: 'Seg a Sex: 07:30 às 18:00 | Sáb: 08:00 às 12:00'
};

export const VENDEDORES = [
  { id: 'v1', nome: 'Carlos (Adubos e Fertilizantes)', telefone: '5546999999991' },
  { id: 'v2', nome: 'Ana (Sementes e Defensivos)', telefone: '5546999999992' },
  { id: 'v3', nome: 'Roberto (Máquinas e Nutrição)', telefone: '5546999999993' }
];

export const CATEGORIAS = [
  { id: '1', nome: 'Todos' },
  { id: '2', nome: 'Adubos' },
  { id: '3', nome: 'Sementes' },
  { id: '4', nome: 'Ferramentas' },
  { id: '5', nome: 'Defensivos' },
  { id: '6', nome: 'Nutrição Animal' },
];

export const TB_PRODUTO = [
  // --- ADUBOS ---
  { 
    id: 'p1', 
    nome: 'Adubo NPK 10-10-10', 
    descricao: 'Fertilizante mineral misto ideal para o crescimento saudável de plantas, hortaliças e pastagens. Pacote 50kg.', 
    preco: 185.00, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '2', 
    imagem: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500' // Foto real
  },
  { 
    id: 'p5', 
    nome: 'Ureia Agrícola', 
    descricao: 'Fertilizante nitrogenado de alta eficiência para diversas culturas. Saco 50kg.', 
    preco: 210.00, 
    precoAntigo: 230.00, // Já com promoção de exemplo!
    ativo: true, 
    id_categoria: '2', 
    imagem: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500' 
  },
  
  // --- SEMENTES ---
  { 
    id: 'p2', 
    nome: 'Semente de Milho Híbrido', 
    descricao: 'Sementes de alta produtividade e resistência a pragas locais. Saco 20kg.', 
    preco: 320.00, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '3', 
    imagem: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500' 
  },
  { 
    id: 'p3', 
    nome: 'Semente de Soja RR', 
    descricao: 'Ciclo precoce, alta sanidade e excelente engalhamento. Saco 40kg.', 
    preco: 250.00, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '3', 
    imagem: 'https://images.unsplash.com/photo-1599578138590-b1d8eb6d10c0?w=500' 
  },
  
  // --- FERRAMENTAS ---
  { 
    id: 'p4', 
    nome: 'Enxada Metálica Forjada', 
    descricao: 'Enxada forjada em aço carbono com cabo de madeira de 1.5m, excelente durabilidade.', 
    preco: 45.50, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '4', 
    imagem: 'https://images.unsplash.com/photo-1416879598555-22008719f9b5?w=500' 
  },
  { 
    id: 'p8', 
    nome: 'Pulverizador Costal 20L', 
    descricao: 'Sistema de compressão prévia, bico de latão, ideal para defensivos.', 
    preco: 150.00, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '4', 
    imagem: 'https://plus.unsplash.com/premium_photo-1664302152985-1bf8407ee23c?w=500' 
  },

  // --- NUTRIÇÃO ANIMAL ---
  { 
    id: 'p12', 
    nome: 'Sal Mineral para Bovinos', 
    descricao: 'Suplemento mineral pronto para uso, garante ganho de peso. 30kg.', 
    preco: 85.00, 
    precoAntigo: null,
    ativo: true, 
    id_categoria: '6', 
    imagem: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=500' 
  }
];