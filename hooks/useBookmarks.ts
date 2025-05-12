import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'scp_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmarks = async (newBookmarks: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  };

  const toggleBookmark = (scpId: string) => {
    const isBookmarked = bookmarks.includes(scpId);
    let newBookmarks: string[];
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(id => id !== scpId);
    } else {
      newBookmarks = [...bookmarks, scpId];
    }
    
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
    return !isBookmarked;
  };

  const isBookmarked = (scpId: string) => {
    return bookmarks.includes(scpId);
  };

  return {
    bookmarks,
    isLoading,
    toggleBookmark,
    isBookmarked,
  };
}