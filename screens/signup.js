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

import tw from 'twrnc';

import Logo from '../static/images/netflix-logo.svg';

const SignUp = () => {
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
            <Text style={tw`text-white text-2xl mb-12 self-start`}>Registrarme</Text>
            <TextInput
              style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-8`}
              placeholderTextColor={tw.color('text-white/20')}
              placeholder={'Email'}
              keyboardType={'email-address'}
            />
            <TextInput
              style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-8`}
              placeholderTextColor={tw.color('text-white/20')}
              placeholder={'Contraseña'}
            />
            <Pressable style={tw`mb-12`}>
              <Text style={tw`text-white/40 text-xl`}>Registrarme</Text>
            </Pressable>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-white`}>¿Ya tienes una cuenta? </Text>
              <Pressable>
                <Text style={tw`text-red-500 font-bold`}>Ingresar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
