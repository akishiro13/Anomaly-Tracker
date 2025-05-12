import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { SCPs } from '@/constants/MockData';
import SCPCard from '@/components/SCPCard';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(SCPs);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(SCPs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = SCPs.filter(scp => 
      scp.id.toLowerCase().includes(query) ||
      scp.name.toLowerCase().includes(query) ||
      scp.description.toLowerCase().includes(query) ||
      scp.objectClass.toLowerCase().includes(query)
    );

    setSearchResults(filtered);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="Search SCPs" />
      
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
        />
      </View>
      
      {searchResults.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={[
            styles.noResultsText,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            No SCPs found matching "{searchQuery}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scpList: {
    marginTop: 16,
  },
  scpListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  noResultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});