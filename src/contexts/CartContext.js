import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  // Adiciona o item ou aumenta a quantidade se ele já existir
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const itemExiste = prev.find((item) => item.id === produto.id);
      if (itemExiste) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: (item.quantidade || 1) + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  // Diminui a quantidade. Se chegar a menos de 1, remove o item da lista
  const diminuirQuantidade = (id) => {
    setCarrinho((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item && item.quantidade > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Remove o produto completamente, independente da quantidade
  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        carrinho, 
        adicionarAoCarrinho, 
        removerDoCarrinho, 
        diminuirQuantidade,
        limparCarrinho,
        
        // Aliases em inglês para manter total compatibilidade com o seu Catálogo
        cart: carrinho,
        addToCart: adicionarAoCarrinho,
        removeFromCart: removerDoCarrinho,
        decreaseQuantity: diminuirQuantidade,
        clearCart: limparCarrinho
      }}
    >
      {children}
    </CartContext.Provider>
  );
};