/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useState} from 'react';
import tw from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {supabase} from './lib/supabase';

import {Text} from 'react-native'

import SignUp from './screens/signup';
import SignIn from './screens/signin';
import PasswordRecovery from './screens/passwordRecovery';
import Home from './screens/home';

// Root Stack envuelve todo la app
const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
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
  );
};

const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => {
        tabBarIcon: ({focused}) => {

        }
      }}
    >
      <Tabs.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false
        }}
      />
    </Tabs.Navigator>
  )
}

function App() {
  const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {
          !user ? (
            <RootStack.Screen
              name={'Auth'}
              component={AuthNavigator}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <RootStack.Screen
              name={'HomeTabs'}
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
          )
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
