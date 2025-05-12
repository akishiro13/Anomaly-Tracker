import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme, Alert, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { 
  Moon, 
  Sun, 
  Smartphone, 
  Trash2, 
  Save, 
  Info, 
  Globe, 
  Bell 
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
  const clearBookmarks = async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to clear all bookmarks? This action cannot be undone.');
      if (confirmed) {
        await AsyncStorage.removeItem('scp_bookmarks');
        router.replace('/bookmarks');
      }
    } else {
      Alert.alert(
        'Clear Bookmarks',
        'Are you sure you want to clear all bookmarks? This action cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: async () => {
              await AsyncStorage.removeItem('scp_bookmarks');
              router.replace('/bookmarks');
            },
          },
        ]
      );
    }
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="Settings" />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            Appearance
          </Text>
          
          <View style={[
            styles.settingItem,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}>
            <View style={styles.settingIconContainer}>
              {isDark ? (
                <Moon size={20} color={Colors[colorScheme ?? 'light'].text} />
              ) : (
                <Sun size={20} color={Colors[colorScheme ?? 'light'].text} />
              )}
            </View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                Theme
              </Text>
              <Text style={[
                styles.settingDescription,
                { color: Colors[colorScheme ?? 'light'].tabIconDefault }
              ]}>
                {isDark ? 'Dark Mode' : 'Light Mode'} (uses system setting)
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}>
            App Settings
          </Text>
          
          <View style={[
            styles.settingItem,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors[colorScheme ?? 'light'].text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                Notifications
              </Text>
              <Text style={[
                styles.settingDescription,
                { color: Colors[colorScheme ?? 'light'].tabIconDefault }
              ]}>
                Receive updates on new SCPs
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: '#767577',
                true: Colors[colorScheme ?? 'light'].accent,
              }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={[
            styles.settingItem,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}>
            <View style={styles.settingIconContainer}>
              <Smartphone size={20} color={Colors[colorScheme ?? 'light'].text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                Offline Mode
              </Text>
              <Text style={[
                styles.settingDescription,
                { color: Colors[colorScheme ?? 'light'].tabIconDefault }
              ]}>
                Cache SCPs for offline viewing
              </Text>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{
                false: '#767577',
                true: Colors[colorScheme ?? 'light'].accent,
              }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={[
            styles.settingItem,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}>
            <View style={styles.settingIconContainer}>
              <Save size={20} color={Colors[colorScheme ?? 'light'].text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                { color: Colors[colorScheme ?? 'light'].text }
              ]}>
                Auto-save
              </Text>
              <Text style={[
                styles.settingDescription,
                { color: Colors[colorScheme ?? 'light'].tabIconDefault }
              ]}>
                Automatically save reading progress
              </Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{
                false: '#767577',
                true: Colors[colorScheme ?? 'light'].accent,
              }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.dangerButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].keter }
          ]}
          onPress={clearBookmarks}
        >
          <Trash2 size={18} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Clear All Bookmarks</Text>
        </TouchableOpacity>
        
        <View style={styles.appInfo}>
          <Text style={[
            styles.appVersion,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            SCP Foundation App v1.0.0
          </Text>
          <Text style={[
            styles.appCopyright,
            { color: Colors[colorScheme ?? 'light'].tabIconDefault }
          ]}>
            Fan-made application
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  appInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  appVersion: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  appCopyright: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});