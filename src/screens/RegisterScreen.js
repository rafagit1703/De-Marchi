import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ onNavigateToLogin }) {
  const { theme } = useContext(ThemeContext);
  const { register } = useContext(AuthContext);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Ionicons name="person-add" size={60} color={theme.primary} style={{ marginBottom: 20 }} />
      <Text style={[styles.title, { color: theme.text }]}>Criar Conta</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Junte-se à Agro De Marchi</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
        placeholder="Nome Completo"
        placeholderTextColor={theme.textSecondary}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
        placeholder="E-mail"
        placeholderTextColor={theme.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
        placeholder="Senha"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => register(nome, email, senha)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToLogin} style={{ marginTop: 20 }}>
        <Text style={{ color: theme.primaryDark, fontWeight: 'bold' }}>Já tem conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 40 },
  input: { width: '100%', height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});