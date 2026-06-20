import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title }) {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary, borderBottomColor: theme.border }]}>
      <Text style={[styles.title, { color: '#FFF' }]}>{title}</Text>
      <TouchableOpacity onPress={toggleTheme} style={styles.btn}>
        <Ionicons name={isDark ? "sunny" : "moon"} size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  btn: { padding: 5 }
});