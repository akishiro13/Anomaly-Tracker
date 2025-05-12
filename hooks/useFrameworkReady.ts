import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export function useFrameworkReady() {
  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS !== 'web') {
          await SplashScreen.preventAutoHideAsync();
        }
      } catch (e) {
        console.warn('Error preventing splash screen auto-hide:', e);
      }
    }
    prepare();
  }, []);
}