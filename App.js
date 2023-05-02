/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import tw from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {supabase} from './lib/supabase';

import SignUp from './screens/signup';
import SignIn from './screens/signin';
import PasswordRecovery from './screens/passwordRecovery';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          options={{
            headerShown: false,
          }}
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
          }}
          component={SignUp}
        />
        <Stack.Screen
          name="PasswordRecovery"
          options={{
            headerShown: false,
          }}
          component={PasswordRecovery}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
