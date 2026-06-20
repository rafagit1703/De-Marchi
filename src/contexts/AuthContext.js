import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext();

// Simulação de Criptografia (RNF-03)
// Num ambiente real, usaríamos bibliotecas como bcrypt no backend.
// Aqui, apenas ofuscamos a string para não salvar em texto limpo.
const simularCriptografia = (senha) => {
  return `enc_${senha}_hash_simulado`; 
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Banco de Dados em Memória: Já inicializado com o Lojista (Admin)
  const [usersDb, setUsersDb] = useState([
    { 
      id: 'admin_1', 
      name: 'Lojista De Marchi', 
      email: 'admin@demarchi.com', 
      password: simularCriptografia('admin123'), // A senha guardada já está "criptografada"
      role: 'admin' 
    }
  ]);

  const login = (email, password) => {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    const senhaCriptografada = simularCriptografia(password); // Criptografa o input para comparar

    setTimeout(() => {
      // Busca no banco local
      const foundUser = usersDb.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === senhaCriptografada
      );

      if (foundUser) {
        setUser({
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role, // Passa a permissão para a aplicação (Admin/Cliente)
          token: `jwt-token-${foundUser.id}`, 
        });
      } else {
        Alert.alert("Falha no Login", "E-mail ou senha incorretos.");
      }
      setIsLoading(false);
    }, 500);
  };

  const register = (nome, email, password) => {
    if (!nome || !email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userExists = usersDb.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        Alert.alert("Atenção", "Este e-mail já está cadastrado.");
        setIsLoading(false);
        return;
      }

      // Criação de um usuário comum
      const newUser = {
        id: Date.now().toString(),
        name: nome,
        email: email,
        password: simularCriptografia(password), // Aplica criptografia na criação (RNF-03)
        role: 'cliente' 
      };

      setUsersDb(prev => [...prev, newUser]);
      setUser({ 
        id: newUser.id, name: newUser.name, email: newUser.email, 
        role: newUser.role, token: `jwt-token-${newUser.id}` 
      });
      setIsLoading(false);
    }, 500);
  };
  
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};