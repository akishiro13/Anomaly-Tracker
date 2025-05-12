import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export default function SearchBar({ 
  placeholder = 'Search SCPs...', 
  value, 
  onChangeText,
  onClear
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
        borderColor: Colors[colorScheme ?? 'light'].border,
      }
    ]}>
      <Search 
        size={20} 
        color={Colors[colorScheme ?? 'light'].tabIconDefault} 
        style={styles.icon} 
      />
      <TextInput
        style={[
          styles.input,
          { color: Colors[colorScheme ?? 'light'].text }
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <X 
            size={20} 
            color={Colors[colorScheme ?? 'light'].tabIconDefault} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});