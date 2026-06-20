import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { LOJA_INFO, VENDEDORES } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const abrirWhatsAppVendedor = async (telefone, nomeVendedor) => {
    const mensagem = `Olá ${nomeVendedor}, preciso de ajuda com alguns produtos da Agro De Marchi.`;
    const url = `whatsapp://send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", "O WhatsApp não está instalado neste dispositivo.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar abrir o WhatsApp.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Dados do Utilizador */}
      <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.userHeader}>
          <Ionicons name="person-circle" size={60} color={theme.primary} />
          <View style={{ marginLeft: 15 }}>
            <Text style={[styles.userName, { color: theme.text }]}>{user?.name || "Produtor"}</Text>
            <Text style={{ color: theme.textSecondary }}>{user?.email || "email@exemplo.com"}</Text>
          </View>
        </View>
      </View>

      {/* Endereço da Loja */}
      <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>
          <Ionicons name="location" size={18} /> Nossa Loja Física
        </Text>
        <Text style={[styles.storeText, { color: theme.text }]}>{LOJA_INFO.nome}</Text>
        <Text style={[styles.storeSubtext, { color: theme.textSecondary }]}>{LOJA_INFO.endereco}</Text>
        <Text style={[styles.storeSubtext, { color: theme.textSecondary, marginTop: 5 }]}>
          <Ionicons name="time-outline" size={14} /> {LOJA_INFO.horario}
        </Text>
      </View>

      {/* Lista de Vendedores */}
      <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>
          <Ionicons name="headset" size={18} /> Fale com um Vendedor
        </Text>
        {VENDEDORES.map((vendedor) => (
          <TouchableOpacity 
            key={vendedor.id} 
            style={[styles.vendedorItem, { borderBottomColor: theme.border }]}
            onPress={() => abrirWhatsAppVendedor(vendedor.telefone, vendedor.nome)}
          >
            <Text style={{ color: theme.text, fontSize: 16 }}>{vendedor.nome}</Text>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: theme.danger }]} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#FFF" style={{ marginRight: 10 }} />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  section: { padding: 15, borderRadius: 10, borderWidth: 1, marginBottom: 15 },
  userHeader: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  storeText: { fontSize: 16, fontWeight: 'bold' },
  storeSubtext: { fontSize: 14, marginTop: 4 },
  vendedorItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  logoutBtn: { flexDirection: 'row', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});