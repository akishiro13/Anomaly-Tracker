import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export default function InfoSection({ 
  title, 
  children, 
  initiallyExpanded = false 
}: InfoSectionProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const colorScheme = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: expanded ? withTiming(1000, { duration: 300 }) : withTiming(0, { duration: 300 }),
      opacity: expanded ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 300 }),
    };
  });

  return (
    <View style={[
      styles.container,
      { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
    ]}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={[
          styles.title,
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          {title}
        </Text>
        {expanded ? (
          <ChevronUp size={20} color={Colors[colorScheme ?? 'light'].text} />
        ) : (
          <ChevronDown size={20} color={Colors[colorScheme ?? 'light'].text} />
        )}
      </TouchableOpacity>
      
      <Animated.View style={[styles.content, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  content: {
    padding: 16,
    paddingTop: 0,
    overflow: 'hidden',
  },
});