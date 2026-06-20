import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { CATEGORIAS } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function CatalogScreen() {
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const { produtos } = useContext(ProductContext);
  
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('1'); 

  // ESTADOS PARA O CARD DE DETALHES (MODAL)
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const produtosFiltrados = produtos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === '1' || p.id_categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  // Função para abrir o card de detalhes
  const abrirDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  const renderProduto = ({ item }) => (
    // Tornamos o Card clicável para abrir os detalhes
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => abrirDetalhes(item)}
    >
      {/* AGORA USAMOS COMPONENTE DE IMAGEM REAL */}
      <Image 
        source={{ uri: item.imagem }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      
      <View style={styles.cardInfo}>
        <Text style={[styles.productName, { color: theme.text }]}>{item.nome}</Text>
        <Text style={[styles.productDesc, { color: theme.textSecondary }]} numberOfLines={1}>
          {item.descricao}
        </Text>
        
        {item.precoAntigo ? (
          <View style={{ marginTop: 4 }}>
            <Text style={[styles.oldPrice, { color: theme.textSecondary }]}>
              De: R$ {item.precoAntigo.toFixed(2)}
            </Text>
            <Text style={[styles.productPrice, { color: '#E53935' }]}> 
              Por: R$ {item.preco.toFixed(2)}
            </Text>
          </View>
        ) : (
          <Text style={[styles.productPrice, { color: theme.primaryDark, marginTop: 4 }]}>
            R$ {item.preco.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Botão de adicionar ao carrinho isolado */}
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: theme.primary }]} 
        onPress={() => addToCart(item)}
      >
        <Ionicons name="cart-outline" size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Barra de Busca */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Buscar produtos..."
          placeholderTextColor={theme.textSecondary}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* Filtro de Categorias */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIAS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterChip, { backgroundColor: categoriaAtiva === item.id ? theme.primary : theme.surface, borderColor: theme.border }]}
              onPress={() => setCategoriaAtiva(item.id)}
            >
              <Text style={{ color: categoriaAtiva === item.id ? '#FFF' : theme.text }}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id}
        renderItem={renderProduto}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* ========================================================= */}
      {/* CÓDIGO DO CARD DE DETALHES (MODAL FLUTUANTE)             */}
      {/* ========================================================= */}
      {produtoSelecionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
              
              {/* Botão Fechar */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisivel(false)}>
                <Ionicons name="close-circle" size={32} color={theme.textSecondary} />
              </TouchableOpacity>

              {/* Imagem Grande no Card */}
              <Image source={{ uri: produtoSelecionado.imagem }} style={styles.modalImage} resizeMode="cover" />

              {/* Informações Detalhadas */}
              <View style={styles.modalBody}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>{produtoSelecionado.nome}</Text>
                
                <ScrollView style={{ maxHeight: 120, marginVertical: 10 }}>
                  <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
                    {produtoSelecionado.descricao || "Nenhuma descrição detalhada informada para este produto agropecuário."}
                  </Text>
                </ScrollView>

                {/* Preços dentro do Card */}
                {produtoSelecionado.precoAntigo ? (
                  <View style={{ marginBottom: 15 }}>
                    <Text style={{ textDecorationLine: 'line-through', color: theme.textSecondary }}>
                      De: R$ {produtoSelecionado.precoAntigo.toFixed(2)}
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#E53935' }}>
                      Por: R$ {produtoSelecionado.preco.toFixed(2)}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.primaryDark, marginBottom: 15 }}>
                    R$ {produtoSelecionado.preco.toFixed(2)}
                  </Text>
                )}

                {/* Botão de Compra dentro do Card */}
                <TouchableOpacity 
                  style={[styles.modalActionBtn, { backgroundColor: theme.primary }]}
                  onPress={() => {
                    addToCart(produtoSelecionado);
                    setModalVisivel(false); // Fecha o modal após adicionar ao carrinho
                  }}
                >
                  <Ionicons name="cart" size={20} color="#FFF" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 15, paddingHorizontal: 10, height: 45, borderRadius: 8, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 10 },
  filterContainer: { paddingLeft: 15, marginBottom: 10 },
  filterChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1 },
  card: { flexDirection: 'row', padding: 10, marginBottom: 15, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  
  // ESTILO DA IMAGEM QUADRADA NO CATÁLOGO
  productImage: { width: 70, height: 70, borderRadius: 8, marginRight: 15, backgroundColor: '#EEE' },
  
  cardInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productDesc: { fontSize: 12, marginVertical: 4 },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
  oldPrice: { fontSize: 12, textDecorationLine: 'line-through', marginBottom: 2 },
  addButton: { padding: 10, borderRadius: 8 },

  // ESTILOS DO CARD DE DETALHES (MODAL)
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', borderRadius: 15, overflow: 'hidden', position: 'relative', elevation: 5 },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 10 },
  modalImage: { width: '100%', height: 220, backgroundColor: '#EEE' },
  modalBody: { padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  modalDescription: { fontSize: 14, lineHeight: 20 },
  modalActionBtn: { height: 48, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
});