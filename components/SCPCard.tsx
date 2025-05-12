import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { SCP } from '@/types/scp';
import ClassificationBadge from './ClassificationBadge';
import { Bookmark as BookmarkIcon } from 'lucide-react-native';

interface SCPCardProps {
  scp: SCP;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function SCPCard({ scp, isBookmarked, onToggleBookmark }: SCPCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
      ]}
      onPress={() => router.push(`/scps/${scp.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: scp.image }} style={styles.image} />
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={() => onToggleBookmark(scp.id)}
        >
          <BookmarkIcon 
            size={24} 
            color={isBookmarked ? Colors[colorScheme ?? 'light'].accent : Colors[colorScheme ?? 'light'].tabIconDefault} 
            fill={isBookmarked ? Colors[colorScheme ?? 'light'].accent : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[
            styles.scpId,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            SCP-{scp.id}
          </Text>
          <ClassificationBadge objectClass={scp.objectClass} />
        </View>
        <Text style={[
          styles.scpName,
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          {scp.name}
        </Text>
        <Text
          style={[
            styles.description,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}
          numberOfLines={3}
        >
          {scp.description.substring(0, 120)}...
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scpId: {
    fontFamily: 'SpecialElite',
    fontSize: 16,
  },
  scpName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});