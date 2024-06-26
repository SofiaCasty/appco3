import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions, Image, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { API_URL, STAGE } from "@env";
import { useAuthStore } from '../../store/auth/useAuthStore'


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}
export const LoginScreen = ( {navigation}:Props) => {

  const { login } = useAuthStore();
  const [ isPosting, setIsPosting ] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
  const {height} = useWindowDimensions();

  const onLogin = async() => {
    if( form.email.length === 0 || form.password.length === 0 ){
      return;
    }
    setIsPosting(true);

    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if ( wasSuccessful ) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  //console.log({ apiUrl: API_URL, stage: STAGE});
  return (
    <Layout style={{ flex:1}}>
      <ScrollView style={{ marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.10, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/LogoCSG1.png')}
            style={styles.logo}
          />
        </Layout>

        {/* inputs */}
        <Layout style={{marginTop: 10}}>
          <Input 
            placeholder='Correo Electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            value={ form.email }
            onChangeText={ (email) => setForm({ ...form, email})}
            style={styles.input}
            accessoryLeft={ <MyIcon name="email-outline" /> }
          />

          <Input 
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            value={ form.password }
            onChangeText={ (password) => setForm({ ...form, password})}
            style={styles.input}
            accessoryLeft={ <MyIcon name="lock-outline" /> }
          />
        </Layout>


        <Layout style={{ height: 20}}/>

        {/* Boton */}

        <Layout>
          <Button onPress={onLogin} style={styles.button} disabled={isPosting}>Ingresar</Button>
        </Layout>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    marginHorizontal: 40
  },
  input: {
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 10
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  }
});
