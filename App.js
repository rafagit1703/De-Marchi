import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Providers de Contexto
import { ThemeProvider, ThemeContext } from './src/contexts/ThemeContext';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { CartProvider, CartContext } from './src/contexts/CartContext';
import { ProductProvider } from './src/contexts/ProductContext'; // NOVO: Provider de Produtos
import { SellerProvider } from './src/contexts/SellerContext';

// Telas
import Header from './src/components/Header';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AdminScreen from './src/screens/AdminScreen'; // NOVO: Tela do Lojista

function AuthFlow() {
  const [isLogin, setIsLogin] = useState(true);
  
  if (isLogin) {
    return <LoginScreen onNavigateToRegister={() => setIsLogin(false)} />;
  }
  return <RegisterScreen onNavigateToLogin={() => setIsLogin(true)} />;
}

function MainApp() {
  const { user } = useContext(AuthContext);
  const { theme, isDark } = useContext(ThemeContext);
  const { totalItems } = useContext(CartContext);
  
  const [activeTab, setActiveTab] = useState('catalog'); 

  if (!user) {
    return <AuthFlow />;
  }

  // Rotas manuais baseadas no estado
  const renderScreen = () => {
    switch (activeTab) {
      case 'catalog': return <CatalogScreen />;
      case 'cart': return <CartScreen />;
      case 'profile': return <ProfileScreen />;
      case 'admin': return <AdminScreen />; // Carrega painel do Lojista
      default: return <CatalogScreen />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.primary, paddingTop: StatusBar.currentHeight }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={theme.primary} />
      <Header title="Agro De Marchi" />
      
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {renderScreen()}
      </View>

      {/* Tab Bar Customizada */}
      <View style={[styles.tabBar, { backgroundColor: theme.tabBar, borderTopColor: theme.border }]}>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('catalog')}>
          <Ionicons name="leaf-outline" size={24} color={activeTab === 'catalog' ? theme.primary : theme.textSecondary} />
          <Text style={{ color: activeTab === 'catalog' ? theme.primary : theme.textSecondary, fontSize: 12 }}>Catálogo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('cart')}>
          <View>
            <Ionicons name="cart-outline" size={24} color={activeTab === 'cart' ? theme.primary : theme.textSecondary} />
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </View>
          <Text style={{ color: activeTab === 'cart' ? theme.primary : theme.textSecondary, fontSize: 12 }}>Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')}>
          <Ionicons name="person-outline" size={24} color={activeTab === 'profile' ? theme.primary : theme.textSecondary} />
          <Text style={{ color: activeTab === 'profile' ? theme.primary : theme.textSecondary, fontSize: 12 }}>Perfil</Text>
        </TouchableOpacity>

        {/* Mostra a aba de Gestão APENAS se o utilizador for admin */}
        {user.role === 'admin' && (
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('admin')}>
            <Ionicons name="settings-outline" size={24} color={activeTab === 'admin' ? theme.primary : theme.textSecondary} />
            <Text style={{ color: activeTab === 'admin' ? theme.primary : theme.textSecondary, fontSize: 12 }}>Gestão</Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProductProvider>
          <SellerProvider> {/* ADICIONADO AQUI */}
            <CartProvider>
              <MainApp />
            </CartProvider>
          </SellerProvider>
        </ProductProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: { height: 60, flexDirection: 'row', borderTopWidth: 1, elevation: 8 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', right: -8, top: -5, backgroundColor: 'red', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' }
});