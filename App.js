import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './Components/SignUpScreen';
import SignInScreen from './Components/SignInScreen';
import EmailScreen from './Components/EmailScreen';
import DashboardScreen from './Components/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="EmailScreen"
          component={EmailScreen}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}