import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import InfoSection from '@/components/InfoSection';
import { FOUNDATION_INFO } from '@/constants/MockData';

export default function InfoScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="About the SCP Foundation" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.aboutSection,
          { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            Secure. Contain. Protect.
          </Text>
          <Text style={[
            styles.aboutText,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            {FOUNDATION_INFO.about}
          </Text>
          <Text style={[
            styles.missionText,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            {FOUNDATION_INFO.mission}
          </Text>
        </View>
        
        <InfoSection title="Facilities" initiallyExpanded={true}>
          {FOUNDATION_INFO.facilities.map((facility, index) => (
            <View 
              key={facility.name} 
              style={[
                styles.facilityItem,
                index !== FOUNDATION_INFO.facilities.length - 1 && styles.itemDivider
              ]}
            >
              <Text style={[
                styles.facilityName,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                {facility.name}
              </Text>
              <Text style={[
                styles.facilityDescription,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                {facility.description}
              </Text>
              <Text style={[
                styles.facilityLocation,
                { color: Colors[colorScheme ?? 'light'].tabIconDefault }
              ]}>
                Location: {facility.location}
              </Text>
            </View>
          ))}
        </InfoSection>
        
        <InfoSection title="Personnel">
          {FOUNDATION_INFO.personnel.map((personnel, index) => (
            <View 
              key={personnel.title} 
              style={[
                styles.personnelItem,
                index !== FOUNDATION_INFO.personnel.length - 1 && styles.itemDivider
              ]}
            >
              <Text style={[
                styles.personnelTitle,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                {personnel.title}
              </Text>
              <Text style={[
                styles.personnelDescription,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                {personnel.description}
              </Text>
            </View>
          ))}
        </InfoSection>
        
        <InfoSection title="Classification System">
          <View style={styles.classSystem}>
            <View style={styles.classItem}>
              <View style={[styles.classDot, { backgroundColor: Colors[colorScheme ?? 'light'].safe }]} />
              <View style={styles.classDetails}>
                <Text style={[styles.className, { color: Colors[colorScheme ?? 'light'].text }]}>Safe</Text>
                <Text style={[styles.classDesc, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Easily contained, predictable anomalies
                </Text>
              </View>
            </View>
            
            <View style={styles.classItem}>
              <View style={[styles.classDot, { backgroundColor: Colors[colorScheme ?? 'light'].euclid }]} />
              <View style={styles.classDetails}>
                <Text style={[styles.className, { color: Colors[colorScheme ?? 'light'].text }]}>Euclid</Text>
                <Text style={[styles.classDesc, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Unpredictable or not fully understood anomalies
                </Text>
              </View>
            </View>
            
            <View style={styles.classItem}>
              <View style={[styles.classDot, { backgroundColor: Colors[colorScheme ?? 'light'].keter }]} />
              <View style={styles.classDetails}>
                <Text style={[styles.className, { color: Colors[colorScheme ?? 'light'].text }]}>Keter</Text>
                <Text style={[styles.classDesc, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Extremely difficult to contain or highly dangerous anomalies
                </Text>
              </View>
            </View>
            
            <View style={styles.classItem}>
              <View style={[styles.classDot, { backgroundColor: Colors[colorScheme ?? 'light'].thaumiel }]} />
              <View style={styles.classDetails}>
                <Text style={[styles.className, { color: Colors[colorScheme ?? 'light'].text }]}>Thaumiel</Text>
                <Text style={[styles.classDesc, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Anomalies used to contain other SCPs
                </Text>
              </View>
            </View>
          </View>
        </InfoSection>
        
        <Text style={[
          styles.disclaimerText,
          { color: Colors[colorScheme ?? 'light'].tabIconDefault }
        ]}>
          The SCP Foundation is a fictional organization created as a collaborative writing project. This app is a fan-made project with no affiliation to the official SCP Foundation wiki.
        </Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  aboutSection: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontFamily: 'SpecialElite',
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  aboutText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  missionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    lineHeight: 22,
  },
  facilityItem: {
    paddingVertical: 12,
  },
  facilityName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  facilityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  facilityLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  personnelItem: {
    paddingVertical: 12,
  },
  personnelTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  personnelDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  disclaimerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
  classSystem: {
    marginTop: 8,
  },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  classDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  classDetails: {
    marginLeft: 12,
    flex: 1,
  },
  className: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  classDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
  },
});