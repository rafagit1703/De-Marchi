import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onNavigateToRegister }) {
  const { theme } = useContext(ThemeContext);
  const { login, isLoading } = useContext(AuthContext);
  
  // Estados limpos para uso dinâmico
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    login(email, senha);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Ionicons name="leaf" size={80} color={theme.primary} style={{ marginBottom: 20 }} />
      <Text style={[styles.title, { color: theme.text }]}>Agro De Marchi</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Portal do Produtor</Text>

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

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isLoading ? theme.textSecondary : theme.primary }]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Acessar Conta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToRegister} style={{ marginTop: 20 }} disabled={isLoading}>
        <Text style={{ color: theme.primaryDark, fontWeight: 'bold' }}>Novo por aqui? Crie sua conta</Text>
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