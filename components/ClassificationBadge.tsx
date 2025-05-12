import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface ClassificationBadgeProps {
  objectClass: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ClassificationBadge({ 
  objectClass, 
  size = 'medium' 
}: ClassificationBadgeProps) {
  const colorScheme = useColorScheme();
  const classKey = objectClass.toLowerCase() as keyof typeof Colors[typeof colorScheme];
  
  // Fallback to 'explained' if the class doesn't exist in our colors
  const classColor = Colors[colorScheme ?? 'light'][classKey] || 
                     Colors[colorScheme ?? 'light'].explained;
  
  const sizeStyles = {
    small: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      fontSize: 10,
    },
    medium: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      fontSize: 12,
    },
    large: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      fontSize: 14,
    },
  };
  
  return (
    <View style={[
      styles.badge,
      { 
        backgroundColor: classColor, 
        paddingVertical: sizeStyles[size].paddingVertical,
        paddingHorizontal: sizeStyles[size].paddingHorizontal,
        borderRadius: sizeStyles[size].borderRadius,
      }
    ]}>
      <Text style={[
        styles.text,
        { fontSize: sizeStyles[size].fontSize }
      ]}>
        {objectClass}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
  },
});