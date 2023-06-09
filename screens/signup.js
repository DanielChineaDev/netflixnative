import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import tw from 'twrnc';
import {useToast} from 'react-native-toast-notifications';

import Logo from '../static/images/netflix-logo.svg';
import {EyeIcon} from 'react-native-heroicons/outline';
import {EyeSlashIcon} from 'react-native-heroicons/outline';

const SignUp = ({navigation}) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toast = useToast();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    debounce(emailValidation());
    console.log('Email: ', email, isValidEmail);
  }, [email]);

  useEffect(() => {
    debounce(passwordValidation());
    console.log('Password: ', password, isValidPassword);
  }, [password]);

  const emailValidation = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || emailRegex.test(email) === false) {
      setIsValidEmail(false);
      return false;
    }
    setIsValidEmail(true);
    return true;
  };

  const passwordValidation = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    if (!password || passwordRegex.test(password) === false) {
      setIsValidPassword(false);
      return false;
    }
    setIsValidPassword(true);
    return true;
  };

  // Utility FN · Mover a carpeta utils/utils.js
  const debounce = fn => {
    let id = null;

    return (...args) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        fn(...args);
        id = null;
      }, 300);
    };
  };

  const registerUser = () => {
    if (isValidEmail && isValidPassword) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            toast.show({
              type: 'info',
              text1: 'Este email ya existe.',
              text2: 'Por favor prueba un diferente.'
            });
            toast.show('Este email ya existe', {
              type: 'info',
              data: {
                subtitle: 'Por favor prueba uno diferente.',
              },
            });
            return error
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            return error
          }

          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
        >
          <View style={tw`py-6 px-8 flex items-center justify-center`}>
            <Logo width={90} />
          </View>
          <View style={tw`flex-1 items-center justify-center px-12`}>
            <Text style={tw`text-white text-2xl mb-12 self-start`}>
              Registrate
            </Text>
            <TextInput
              style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${
                !isValidEmail && email !== '' && 'border border-red-500'
              }`}
              placeholderTextColor={tw.color('text-white/20')}
              placeholder={'Email'}
              value={email}
              onChangeText={textInput => {
                setEmail(textInput);
              }}
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <Text
              style={tw`text-red-500 self-start mb-6 ${
                (isValidEmail || email === '') && 'opacity-0'
              }`}
            >
              Email incorrecto.
            </Text>
            <View style={tw`relative flex flex-row`}>
              <Pressable
                onPress={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
                style={tw`absolute top-3 right-3 z-10`}
              >
                {!isPasswordVisible ? (
                  <EyeSlashIcon style={tw`w-6 h-6 text-white/40`} />
                ) : (
                  <EyeIcon style={tw`w-6 h-6 text-white/40`} />
                )}
              </Pressable>
              <TextInput
                style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${
                  !isValidPassword && password !== '' && 'border border-red-500'
                }`}
                placeholderTextColor={tw.color('text-white/20')}
                placeholder={'Contraseña'}
                value={password}
                onChangeText={passwordInput => {
                  setPassword(passwordInput);
                }}
                secureTextEntry={!isPasswordVisible}
              />
            </View>
            <Text
              style={tw`text-red-500 self-start mb-6 ${
                (isValidPassword || password === '') && 'opacity-0'
              }`}
            >
              Debe contener A-b-0-!
            </Text>
            <Pressable
              onPress={() => {
                console.log('TOAST!');
                registerUser();
              }}
              style={tw`mb-12`}
            >
              <Text style={tw`text-white/40 text-xl`}>Registrate</Text>
            </Pressable>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-white`}>¿Ya tienes una cuenta? </Text>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text style={tw`text-red-500 font-bold`}>Ingresa</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
