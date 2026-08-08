import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ScreenType, TabType, UserProfile } from '../types';
import { authService } from '../services/authService';

export type ThemeMode = 'dark' | 'light';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
}

export type MusicPlatform = 'Spotify' | 'YouTube Music' | 'Apple Music';

export const PLATFORM_PLAYLISTS: Record<MusicPlatform, MusicTrack[]> = {
  Spotify: [
    { id: 'sp1', title: 'Stronger', artist: 'Kanye West', duration: '05:12', durationSec: 312 },
    { id: 'sp2', title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis', duration: '04:18', durationSec: 258 },
    { id: 'sp3', title: "'Till I Collapse", artist: 'Eminem', duration: '04:57', durationSec: 297 },
  ],
  'YouTube Music': [
    { id: 'yt1', title: 'Levitating', artist: 'Dua Lipa ft. DaBaby', duration: '03:23', durationSec: 203 },
    { id: 'yt2', title: 'Eye of the Tiger', artist: 'Survivor', duration: '04:05', durationSec: 245 },
    { id: 'yt3', title: 'Believer', artist: 'Imagine Dragons', duration: '03:24', durationSec: 204 },
  ],
  'Apple Music': [
    { id: 'am1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '03:20', durationSec: 200 },
    { id: 'am2', title: 'POWER', artist: 'Kanye West', duration: '04:52', durationSec: 292 },
    { id: 'am3', title: 'Remember the Name', artist: 'Fort Minor', duration: '03:50', durationSec: 230 },
  ],
};

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  selectedRecipeId: string;
  setSelectedRecipeId: (id: string) => void;
  isCoachMuted: boolean;
  setIsCoachMuted: (muted: boolean | ((prev: boolean) => boolean)) => void;
  isPlayingRoutine: boolean;
  setIsPlayingRoutine: (playing: boolean | ((prev: boolean) => boolean)) => void;
  routineProgress: number;
  setRoutineProgress: React.Dispatch<React.SetStateAction<number>>;
  activeMusicPlatform: MusicPlatform;
  setActiveMusicPlatform: (platform: MusicPlatform) => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean | ((prev: boolean) => boolean)) => void;
  currentTrackIndex: number;
  currentTrack: MusicTrack;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMusicPlay: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  navigate: (screen: ScreenType, tab?: TabType) => void;
}

const defaultProfile: UserProfile = {
  name: 'Carlos',
  email: 'carlos@teamfit.com',
  age: '32',
  weight: '82',
  size: 'M',
  height: '178',
  goal: 'Tonificar y ganar masa muscular',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('teamfit_token'));
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('rec1');
  const [isCoachMuted, setIsCoachMuted] = useState<boolean>(false);
  const [isPlayingRoutine, setIsPlayingRoutine] = useState<boolean>(false);
  const [routineProgress, setRoutineProgress] = useState<number>(315);
  const [activeMusicPlatform, setActiveMusicPlatformState] = useState<MusicPlatform>('Spotify');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem('teamfit_token');
      setIsAuthenticated(false);
      setUserProfile(defaultProfile);
      setCurrentScreen('biometric');
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:unauthorized', handleUnauthorized);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:unauthorized', handleUnauthorized);
      }
    };
  }, []);

  useEffect(() => {
    async function loadProfileFromApi() {
      const token = localStorage.getItem('teamfit_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const fetchedProfile = await authService.getProfile();
        if (fetchedProfile) {
          setUserProfile(fetchedProfile);
          setIsAuthenticated(true);
        } else {
          // Si el usuario fue eliminado de la BD o el token expiró
          localStorage.removeItem('teamfit_token');
          setIsAuthenticated(false);
          setUserProfile(defaultProfile);
          setCurrentScreen('biometric');
        }
      } catch (error) {
        console.warn('Error al cargar perfil desde la API:', error);
      }
    }
    loadProfileFromApi();
  }, []);

  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      setUserProfile((prev) => ({ ...prev, ...data }));
      const updated = await authService.updateProfile(data);
      if (updated) {
        setUserProfile(updated);
        return true;
      }
    } catch (err) {
      console.warn('Error al actualizar el perfil en la API:', err);
    }
    return false;
  };

  const currentPlaylist = PLATFORM_PLAYLISTS[activeMusicPlatform] || PLATFORM_PLAYLISTS.Spotify;
  const currentTrack = currentPlaylist[currentTrackIndex] || currentPlaylist[0];

  const setActiveMusicPlatform = (platform: MusicPlatform) => {
    setActiveMusicPlatformState(platform);
    setCurrentTrackIndex(0);
    setIsMusicPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
    setIsMusicPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + currentPlaylist.length) % currentPlaylist.length);
    setIsMusicPlaying(true);
  };

  const toggleMusicPlay = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('teamfit_force_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('teamfit_force_theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigate = (screen: ScreenType, tab?: TabType) => {
    setCurrentScreen(screen);
    if (tab) {
      setActiveTab(tab);
    } else {
      if (screen === 'home') setActiveTab('inicio');
      else if (['food_fit', 'ingredient_detail', 'recipe_detail', 'smoothies'].includes(screen)) setActiveTab('food_fit');
      else if (screen === 'routine') setActiveTab('rutinas');
      else if (screen === 'medical') setActiveTab('medica');
      else if (screen === 'coach') setActiveTab('coach');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        updateUserProfile,
        selectedRecipeId,
        setSelectedRecipeId,
        isCoachMuted,
        setIsCoachMuted,
        isPlayingRoutine,
        setIsPlayingRoutine,
        routineProgress,
        setRoutineProgress,
        activeMusicPlatform,
        setActiveMusicPlatform,
        isMusicPlaying,
        setIsMusicPlaying,
        currentTrackIndex,
        currentTrack,
        nextTrack,
        prevTrack,
        toggleMusicPlay,
        theme,
        setTheme,
        toggleTheme,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
