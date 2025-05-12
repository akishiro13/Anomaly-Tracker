import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { SCPs, OBJECT_CLASSES } from '@/constants/MockData';
import SCPCard from '@/components/SCPCard';
import Header from '@/components/Header';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function SCPsScreen() {
  const colorScheme = useColorScheme();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const filteredSCPs = selectedClass 
    ? SCPs.filter(scp => scp.objectClass.toLowerCase() === selectedClass.toLowerCase())
    : SCPs;

  const renderClassFilter = ({ item }: { item: typeof OBJECT_CLASSES[0] }) => {
    const isSelected = selectedClass === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.classFilterItem,
          { 
            backgroundColor: isSelected 
              ? Colors[colorScheme ?? 'light'][item.id as keyof typeof Colors[typeof colorScheme]] 
              : 'transparent',
            borderColor: Colors[colorScheme ?? 'light'][item.id as keyof typeof Colors[typeof colorScheme]]
          }
        ]}
        onPress={() => setSelectedClass(isSelected ? null : item.id)}
      >
        <Text
          style={[
            styles.classFilterText,
            { 
              color: isSelected 
                ? 'white' 
                : Colors[colorScheme ?? 'light'][item.id as keyof typeof Colors[typeof colorScheme]]
            }
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="SCP Foundation Database" />
      
      <FlatList
        data={OBJECT_CLASSES}
        renderItem={renderClassFilter}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.classFilterContainer}
        style={styles.classFilterList}
      />
      
      <FlatList
        data={filteredSCPs}
        renderItem={({ item }) => (
          <SCPCard 
            scp={item} 
            isBookmarked={isBookmarked(item.id)}
            onToggleBookmark={toggleBookmark}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scpListContainer}
        style={styles.scpList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  classFilterList: {
    marginTop: 16,
  },
  classFilterContainer: {
    paddingHorizontal: 16,
  },
  classFilterItem: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  classFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  scpList: {
    marginTop: 16,
  },
  scpListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});