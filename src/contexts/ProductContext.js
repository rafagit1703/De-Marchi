import React, { createContext, useState } from 'react';
import { TB_PRODUTO } from '../data/mockData';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [produtos, setProdutos] = useState(TB_PRODUTO);

  const adicionarProduto = (nome, descricao, preco, id_categoria, imagem) => {
    const novoProduto = {
      id: `p_${Date.now()}`,
      nome,
      descricao, 
      preco: parseFloat(preco),
      precoAntigo: null, 
      id_categoria,
      imagem,
      ativo: true
    };
    setProdutos(prev => [...prev, novoProduto]);
  };

  const excluirProduto = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const editarProduto = (id, nome, descricao, novoPreco, id_categoria, imagem) => {
    setProdutos(prev => prev.map(p => {
      if (p.id === id) {
        const precoNovoFloat = parseFloat(novoPreco);
        let precoAntigo = p.precoAntigo;

        if (precoNovoFloat < p.preco) {
          precoAntigo = p.preco;
        } else if (precoNovoFloat >= p.preco && p.precoAntigo) {
          precoAntigo = null;
        }

        return { 
          ...p, 
          nome, 
          descricao, 
          preco: precoNovoFloat, 
          id_categoria, 
          imagem,
          precoAntigo 
        };
      }
      return p;
    }));
  };

  return (
    <ProductContext.Provider value={{ produtos, adicionarProduto, excluirProduto, editarProduto }}>
      {children}
    </ProductContext.Provider>
  );
};