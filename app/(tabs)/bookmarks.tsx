import React from 'react';
import { View, StyleSheet, FlatList, Text, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { SCPs } from '@/constants/MockData';
import SCPCard from '@/components/SCPCard';
import Header from '@/components/Header';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark as BookmarkIcon } from 'lucide-react-native';

export default function BookmarksScreen() {
  const colorScheme = useColorScheme();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  
  const bookmarkedSCPs = SCPs.filter(scp => bookmarks.includes(scp.id));

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="Bookmarked SCPs" />
      
      {bookmarkedSCPs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <BookmarkIcon 
            size={64} 
            color={Colors[colorScheme ?? 'light'].tabIconDefault} 
          />
          <Text style={[
            styles.emptyTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            No Bookmarks Yet
          </Text>
          <Text style={[
            styles.emptyText,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            Bookmark SCPs by tapping the bookmark icon on any SCP card
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedSCPs}
          renderItem={({ item }) => (
            <SCPCard 
              scp={item} 
              isBookmarked={true}
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
  scpList: {
    marginTop: 16,
  },
  scpListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
  },
});