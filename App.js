/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import SignUp from './screens/signup'
import SignIn from './screens/signin'

import tw from 'twrnc'

import { supabase } from './lib/supabase';

function App() {
  return (
    <SignUp />
    // <SignIn />
  );
}

export default App;
