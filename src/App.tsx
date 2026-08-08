import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/MobileFrame';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { FoodFitScreen } from './screens/FoodFitScreen';
import { IngredientDetailScreen } from './screens/IngredientDetailScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { SmoothiesScreen } from './screens/SmoothiesScreen';
import { RoutineScreen } from './screens/RoutineScreen';
import { MedicalVaultScreen } from './screens/MedicalVaultScreen';
import { CoachScreen } from './screens/CoachScreen';
import { BiometricScreen } from './screens/BiometricScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const MainRouter: React.FC = () => {
  const { currentScreen, isAuthenticated } = useApp();

  if (!isAuthenticated || currentScreen === 'auth') {
    return <AuthScreen />;
  }

  switch (currentScreen) {
    case 'home':
      return <HomeScreen />;
    case 'food_fit':
      return <FoodFitScreen />;
    case 'ingredient_detail':
      return <IngredientDetailScreen />;
    case 'recipe_detail':
      return <RecipeDetailScreen />;
    case 'smoothies':
      return <SmoothiesScreen />;
    case 'routine':
      return <RoutineScreen />;
    case 'medical':
      return <MedicalVaultScreen />;
    case 'coach':
      return <CoachScreen />;
    case 'biometric':
      return <BiometricScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MobileFrame>
        <MainRouter />
      </MobileFrame>
    </AppProvider>
  );
};

export default App;
