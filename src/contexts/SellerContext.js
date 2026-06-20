import React, { createContext, useState } from 'react';
import { VENDEDORES } from '../data/mockData';

export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // Inicializa com os vendedores do mockData
  const [vendedores, setVendedores] = useState(VENDEDORES);

  const adicionarVendedor = (nome, telefone) => {
    const novoVendedor = {
      id: `v_${Date.now()}`,
      nome,
      telefone
    };
    setVendedores(prev => [...prev, novoVendedor]);
  };

  const editarVendedor = (id, nome, telefone) => {
    setVendedores(prev => prev.map(v => 
      v.id === id ? { ...v, nome, telefone } : v
    ));
  };

  const removerVendedor = (id) => {
    setVendedores(prev => prev.filter(v => v.id !== id));
  };

  return (
    <SellerContext.Provider value={{ vendedores, adicionarVendedor, editarVendedor, removerVendedor }}>
      {children}
    </SellerContext.Provider>
  );
};