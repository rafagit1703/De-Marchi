import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { CartContext } from '../contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { theme } = useContext(ThemeContext);
  const { carrinho, adicionarAoCarrinho, diminuirQuantidade, removerDoCarrinho } = useContext(CartContext); 

  const itensCarrinho = carrinho || [];
  
  // Calcula o valor total multiplicando o preço de cada produto pela sua quantidade
  const total = itensCarrinho.reduce((sum, item) => sum + (item.preco * (item.quantidade || 1)), 0);

  const finalizarCompraWhatsApp = () => {
    if (itensCarrinho.length === 0) {
      Alert.alert("Atenção", "O seu carrinho está vazio.");
      return;
    }

    let mensagem = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
    itensCarrinho.forEach((item, index) => {
      const qtd = item.quantidade || 1;
      const subtotal = item.preco * qtd;
      mensagem += `${index + 1}. [${qtd}x] ${item.nome} - R$ ${subtotal.toFixed(2)}\n`;
    });
    mensagem += `\n*Total do Pedido: R$ ${total.toFixed(2)}*`;

    const numeroLoja = "5546999999999"; 
    const url = `whatsapp://send?phone=${numeroLoja}&text=${encodeURIComponent(mensagem)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Erro", "WhatsApp não está instalado neste dispositivo.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Erro ao abrir o WhatsApp', err));
  };

  const renderItem = ({ item }) => {
    const qtd = item.quantidade || 1;
    const subtotal = item.preco * qtd;

    return (
      <View style={[styles.cartItem, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        
        {/* Lado Esquerdo: Informações de Texto e Valores */}
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={2}>
            {item.nome}
          </Text>
          <Text style={[styles.itemPrice, { color: theme.textSecondary, fontSize: 12 }]}>
            Unitário: R$ {item.preco.toFixed(2)}
          </Text>
          <Text style={[styles.itemSubtotal, { color: theme.primaryDark, fontWeight: 'bold', marginTop: 3 }]}>
            Total: R$ {subtotal.toFixed(2)}
          </Text>
        </View>

        {/* Centro: Controles de Unidades (+ e -) */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={[styles.qtyButton, { backgroundColor: theme.border }]} 
            onPress={() => diminuirQuantidade(item.id)}
          >
            <Ionicons name="remove" size={16} color={theme.text} />
          </TouchableOpacity>
          
          <Text style={[styles.qtyText, { color: theme.text }]}>{qtd}</Text>
          
          <TouchableOpacity 
            style={[styles.qtyButton, { backgroundColor: theme.border }]} 
            onPress={() => adicionarAoCarrinho(item)}
          >
            <Ionicons name="add" size={16} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Lado Direito: Botão de Apagar a Linha Toda */}
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removerDoCarrinho(item.id)}
        >
          <Ionicons name="trash-outline" size={22} color={theme.danger} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {itensCarrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={theme.textSecondary} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            O seu carrinho está vazio.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={itensCarrinho}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 15 }}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Total Pedido:</Text>
              <Text style={[styles.totalValue, { color: theme.primaryDark }]}>
                R$ {total.toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
              onPress={finalizarCompraWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.checkoutText}>Finalizar via WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, marginTop: 15, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 10, borderRadius: 8, borderWidth: 1 },
  itemInfo: { flex: 1, paddingRight: 5 },
  itemName: { fontSize: 15, fontWeight: 'bold' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, gap: 6 },
  qtyButton: { width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 15, fontWeight: 'bold', minWidth: 18, textAlign: 'center' },
  removeButton: { padding: 5, marginLeft: 5 },
  footer: { padding: 20, borderTopWidth: 1 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 22, fontWeight: 'bold' },
  checkoutButton: { height: 50, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});