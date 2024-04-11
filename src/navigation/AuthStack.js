import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null); 

    useEffect(() => {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      });
    }, []);
  
    if (isFirstLaunch === null) {
      return null;
    } else if (isFirstLaunch === true) {
      return (
        <SafeAreaProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
        </SafeAreaProvider>
      );
    } else {
      return (
        <SafeAreaProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen 
                name="Signup"
                component={SignupScreen}
                options={() => ({
                  title: '',
                  headerStyle:{
                    backgroundColor: '#f9fafd',
                    elevation: 0,
                  },
                 
                })}
              />
            </Stack.Navigator>
        </SafeAreaProvider>
      );
    }
};

export default AuthStack;
