import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { SCPs } from '@/constants/MockData';
import Header from '@/components/Header';
import ClassificationBadge from '@/components/ClassificationBadge';
import { Bookmark as BookmarkIcon, ArrowLeft } from 'lucide-react-native';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function SCPDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const scp = SCPs.find(item => item.id === id);
  
  if (!scp) {
    return (
      <View style={[
        styles.container, 
        { backgroundColor: Colors[colorScheme ?? 'light'].background }
      ]}>
        <Header title="SCP Not Found" showBackButton />
        <View style={styles.errorContainer}>
          <Text style={[
            styles.errorText,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            The requested SCP file could not be found in the database.
          </Text>
          <TouchableOpacity 
            style={[
              styles.backButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].accent }
            ]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Return to Database</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const markedAsBookmarked = isBookmarked(scp.id);

  const handleToggleBookmark = () => {
    toggleBookmark(scp.id);
  };

  const BookmarkButton = () => (
    <TouchableOpacity onPress={handleToggleBookmark}>
      <BookmarkIcon 
        size={24} 
        color={Colors[colorScheme ?? 'light'].text} 
        fill={markedAsBookmarked ? Colors[colorScheme ?? 'light'].accent : 'transparent'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header 
        title={`SCP-${scp.id}`} 
        showBackButton 
        rightComponent={<BookmarkButton />}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.classificationContainer}>
            <ClassificationBadge objectClass={scp.objectClass} size="large" />
          </View>
          <Text style={[
            styles.scpName,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            {scp.name}
          </Text>
        </View>
        
        <Image 
          source={{ uri: scp.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={[
          styles.section,
          { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            Special Containment Procedures
          </Text>
          <Text style={[
            styles.sectionContent,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            {scp.containmentProcedures}
          </Text>
        </View>
        
        <View style={[
          styles.section,
          { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            Description
          </Text>
          <Text style={[
            styles.sectionContent,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            {scp.description}
          </Text>
        </View>
        
        {scp.addendums.map((addendum, index) => (
          <View 
            key={`addendum-${index}`}
            style={[
              styles.section,
              { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
            ]}
          >
            <Text style={[
              styles.sectionTitle,
              { color: Colors[colorScheme ?? 'light'].text }
            ]}>
              {addendum.title}
            </Text>
            <Text style={[
              styles.sectionContent,
              { color: Colors[colorScheme ?? 'light'].text }
            ]}>
              {addendum.content}
            </Text>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={[
            styles.footerText,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            Document #SCP-{scp.id}
          </Text>
          <Text style={[
            styles.footerText,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            Classification: {scp.objectClass}
          </Text>
          <Text style={[
            styles.footerText,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            Access Level: Level 3/{scp.id}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  headerContainer: {
    padding: 16,
  },
  classificationContainer: {
    marginBottom: 12,
  },
  scpName: {
    fontFamily: 'SpecialElite',
    fontSize: 24,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 240,
    marginBottom: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  sectionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});