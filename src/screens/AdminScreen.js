import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { ProductContext } from '../contexts/ProductContext';
import { SellerContext } from '../contexts/SellerContext';
import { CATEGORIAS } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function AdminScreen() {
  const { theme } = useContext(ThemeContext);
  const [abaAtual, setAbaAtual] = useState('produtos'); 

  const { produtos, adicionarProduto, editarProduto, excluirProduto } = useContext(ProductContext);
  const { vendedores, adicionarVendedor, editarVendedor, removerVendedor } = useContext(SellerContext);

  // Estados Formulário Produtos
  const [nomeProd, setNomeProd] = useState('');
  const [descricaoProd, setDescricaoProd] = useState(''); 
  const [precoProd, setPrecoProd] = useState('');
  const [imagemProd, setImagemProd] = useState('');
  const categoriasParaCadastro = CATEGORIAS.filter(c => c.id !== '1');
  const [categoriaId, setCategoriaId] = useState(categoriasParaCadastro[0].id);
  const [editandoProdId, setEditandoProdId] = useState(null);

  // Estados Formulário Vendedores
  const [nomeVend, setNomeVend] = useState('');
  const [telefoneVend, setTelefoneVend] = useState('');
  const [editandoVendId, setEditandoVendId] = useState(null);

  const handleSalvarProduto = () => {
    if (!nomeProd || !descricaoProd || !precoProd || !imagemProd) {
      Alert.alert("Atenção", "Preencha todos os campos, incluindo a descrição.");
      return;
    }

    if (editandoProdId) {
      editarProduto(editandoProdId, nomeProd, descricaoProd, precoProd, categoriaId, imagemProd);
      Alert.alert("Sucesso", "Produto atualizado com sucesso!");
    } else {
      adicionarProduto(nomeProd, descricaoProd, precoProd, categoriaId, imagemProd);
      Alert.alert("Sucesso", "Novo produto cadastrado!");
    }
    cancelarEdicaoProduto();
  };

  const iniciarEdicaoProduto = (produto) => {
    setNomeProd(produto.nome);
    setDescricaoProd(produto.descricao || ''); 
    setPrecoProd(produto.preco.toString());
    setImagemProd(produto.imagem);
    setCategoriaId(produto.id_categoria);
    setEditandoProdId(produto.id);
  };

  const cancelarEdicaoProduto = () => {
    setNomeProd(''); setDescricaoProd(''); setPrecoProd(''); setImagemProd(''); setEditandoProdId(null);
  };

  const handleSalvarVendedor = () => {
    if (!nomeVend || !telefoneVend) {
      Alert.alert("Atenção", "Preencha o nome e o telefone do vendedor.");
      return;
    }
    if (editandoVendId) {
      editarVendedor(editandoVendId, nomeVend, telefoneVend);
      Alert.alert("Sucesso", "Contato atualizado!");
    } else {
      adicionarVendedor(nomeVend, telefoneVend);
      Alert.alert("Sucesso", "Novo vendedor adicionado!");
    }
    cancelarEdicaoVendedor();
  };

  const iniciarEdicaoVendedor = (vendedor) => {
    setNomeVend(vendedor.nome);
    setTelefoneVend(vendedor.telefone);
    setEditandoVendId(vendedor.id);
  };

  const cancelarEdicaoVendedor = () => {
    setNomeVend(''); setTelefoneVend(''); setEditandoVendId(null);
  };

  const renderProduto = ({ item }) => {
    const catNome = CATEGORIAS.find(c => c.id === item.id_categoria)?.nome || 'Sem Categoria';
    return (
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Image source={{ uri: item.imagem }} style={styles.productImage} resizeMode="cover" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>{item.nome}</Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{catNome}</Text>
          {item.precoAntigo && (
            <Text style={{ color: theme.textSecondary, textDecorationLine: 'line-through', fontSize: 12 }}>
              R$ {item.precoAntigo.toFixed(2)}
            </Text>
          )}
          <Text style={{ color: theme.primaryDark, fontWeight: 'bold' }}>R$ {item.preco.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => iniciarEdicaoProduto(item)} style={{ padding: 10 }}>
            <Ionicons name="pencil-outline" size={24} color={theme.primaryDark} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirProduto(item.id)} style={{ padding: 10 }}>
            <Ionicons name="trash-outline" size={24} color={theme.danger} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderVendedor = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Ionicons name="person-circle-outline" size={40} color={theme.primary} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{item.nome}</Text>
        <Text style={{ color: theme.textSecondary }}>{item.telefone}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => iniciarEdicaoVendedor(item)} style={{ padding: 10 }}>
          <Ionicons name="pencil-outline" size={24} color={theme.primaryDark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removerVendedor(item.id)} style={{ padding: 10 }}>
          <Ionicons name="trash-outline" size={24} color={theme.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity 
          style={[styles.tabBtn, { backgroundColor: abaAtual === 'produtos' ? theme.primary : theme.surface, borderColor: theme.border }]}
          onPress={() => setAbaAtual('produtos')}
        >
          <Text style={{ color: abaAtual === 'produtos' ? '#FFF' : theme.text, fontWeight: 'bold' }}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, { backgroundColor: abaAtual === 'vendedores' ? theme.primary : theme.surface, borderColor: theme.border }]}
          onPress={() => setAbaAtual('vendedores')}
        >
          <Text style={{ color: abaAtual === 'vendedores' ? '#FFF' : theme.text, fontWeight: 'bold' }}>Vendedores</Text>
        </TouchableOpacity>
      </View>

      {abaAtual === 'produtos' ? (
        <>
          <View style={[styles.form, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={{ color: theme.text, marginBottom: 10, fontWeight: 'bold' }}>
              {editandoProdId ? 'A Editar Produto' : 'Novo Produto'}
            </Text>
            
            <TextInput style={[styles.input, { color: theme.text, borderColor: theme.border }]} placeholder="Nome" placeholderTextColor={theme.textSecondary} value={nomeProd} onChangeText={setNomeProd} />
            
            <TextInput 
              style={[styles.input, { color: theme.text, borderColor: theme.border, height: 65, textAlignVertical: 'top' }]} 
              placeholder="Descrição detalhada do produto" 
              placeholderTextColor={theme.textSecondary} 
              value={descricaoProd} 
              onChangeText={setDescricaoProd} 
              multiline={true} 
              numberOfLines={3}
            />

            <View style={{ flexDirection: 'row' }}>
              <TextInput style={[styles.input, { flex: 1, marginRight: 10, color: theme.text, borderColor: theme.border }]} placeholder="Preço" placeholderTextColor={theme.textSecondary} keyboardType="numeric" value={precoProd} onChangeText={setPrecoProd} />
              <TextInput style={[styles.input, { flex: 1, color: theme.text, borderColor: theme.border }]} placeholder="URL da Imagem" placeholderTextColor={theme.textSecondary} value={imagemProd} onChangeText={setImagemProd} />
            </View>

            <Text style={{ color: theme.textSecondary, marginBottom: 5, fontSize: 12 }}>Categoria:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
              {categoriasParaCadastro.map((cat) => (
                <TouchableOpacity key={cat.id} style={[styles.filterChip, { backgroundColor: categoriaId === cat.id ? theme.primary : 'transparent', borderColor: theme.border }]} onPress={() => setCategoriaId(cat.id)}>
                  <Text style={{ color: categoriaId === cat.id ? '#FFF' : theme.text, fontSize: 12 }}>{cat.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[styles.btn, { flex: 1, backgroundColor: editandoProdId ? theme.primaryDark : theme.primary }]} onPress={handleSalvarProduto}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{editandoProdId ? 'Guardar Alterações' : 'Cadastrar Produto'}</Text>
              </TouchableOpacity>
              {editandoProdId && (
                <TouchableOpacity style={[styles.btn, { flex: 1, backgroundColor: theme.danger }]} onPress={cancelarEdicaoProduto}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={[styles.headerText, { color: theme.text }]}>Produtos Atuais</Text>
          <FlatList data={produtos} keyExtractor={item => item.id} renderItem={renderProduto} showsVerticalScrollIndicator={false} />
        </>
      ) : (
        <>
          <View style={[styles.form, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={{ color: theme.text, marginBottom: 10, fontWeight: 'bold' }}>
              {editandoVendId ? 'A Editar Vendedor' : 'Novo Vendedor'}
            </Text>
            <TextInput style={[styles.input, { color: theme.text, borderColor: theme.border }]} placeholder="Nome (Ex: Carlos)" placeholderTextColor={theme.textSecondary} value={nomeVend} onChangeText={setNomeVend} />
            <TextInput style={[styles.input, { color: theme.text, borderColor: theme.border }]} placeholder="WhatsApp" placeholderTextColor={theme.textSecondary} keyboardType="phone-pad" value={telefoneVend} onChangeText={setTelefoneVend} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[styles.btn, { flex: 1, backgroundColor: editandoVendId ? theme.primaryDark : theme.primary }]} onPress={handleSalvarVendedor}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{editandoVendId ? 'Atualizar' : 'Adicionar'}</Text>
              </TouchableOpacity>
              {editandoVendId && (
                <TouchableOpacity style={[styles.btn, { flex: 1, backgroundColor: theme.danger }]} onPress={cancelarEdicaoVendedor}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={[styles.headerText, { color: theme.text }]}>Contatos Atuais</Text>
          <FlatList data={vendedores} keyExtractor={item => item.id} renderItem={renderVendedor} showsVerticalScrollIndicator={false} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  tabBtn: { flex: 1, padding: 12, borderWidth: 1, alignItems: 'center', borderRadius: 8, marginHorizontal: 5 },
  headerText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 5 },
  form: { padding: 15, borderWidth: 1, borderRadius: 10, marginBottom: 15 },
  input: { height: 45, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, height: 35, justifyContent: 'center' },
  btn: { height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 5 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, borderWidth: 1, borderRadius: 8 },
  productImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15, backgroundColor: '#EEE' },
  title: { fontSize: 16, fontWeight: 'bold' }
});