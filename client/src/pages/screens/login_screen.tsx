import {Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Linking} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD2Colors as Colors } from 'react-native-paper'
import {KakaoOAuthToken, login, loginWithKakaoAccount} from "@react-native-seoul/kakao-login";
import axios from "axios";

export default function LoginScreen({navigation}) {

  const Url = "http://localhost:8080"

  const signInWithKakao = async (): Promise<void> => {
    const accessToken: KakaoOAuthToken = await loginWithKakaoAccount();
    try {
      const res = await axios.post(Url + "/auth/kakao", accessToken);
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={[styles.view]}>
      <View>
        <Icon name="snake" color={Colors.grey800} size={100} style={[styles.logo]}/>
        <Text style={[styles.title]}>LH Project</Text>
      </View>

      <View>
        <TextInput style={styles.textInput} placeholder="ID/EMAIL"/>
        <TextInput style={styles.textInput} placeholder="PASSWORD"/>
        <Text style={[styles.button]} onPress = {() => navigation.navigate('Main')}>Login</Text>
        <Text style={[styles.sign_in]} onPress = {() => navigation.navigate('SignUp_ID')}>SIGN UP</Text>
      </View>

      <View style={[styles.social]}>
        <TouchableOpacity onPress = {()=> Linking.openURL("https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=30PnYBKZcmQNaYFnLTfp&state=asd&redirect_uri=http://localhost:8080/login/oauth2/code/naver")}>
          <Image style={[styles.icon]} source={require('../../images/naver.png')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=> signInWithKakao()}>
          <Image style={[styles.icon]} source={require('../../images/kakaotalk.png')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=> Linking.openURL('https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=560377445427-57jr939gh7a4n42ikodqenu27gh1uut2.apps.googleusercontent.com&redirect_uri=http://www.rats-lh.com:8080/login/oauth2/code/google')}>
          <Image style={[styles.icon]} source={require('../../images/google.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {backgroundColor: Colors.grey200, flex: 1, justifyContent: 'center'},

  logo: {paddingLeft: '37%'},

  title: {color: Colors.purple500, fontSize: 40, fontFamily: 'Oswald-Bold', textAlign:'center', marginBottom: 40},

  textInput: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, 
  padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, fontSize: 15},

  button: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', backgroundColor: Colors.purple500, 
    borderRadius: 10, padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, textAlign: 'center'},

  social: {flexDirection: 'row', justifyContent: 'space-evenly', padding: 10, marginTop: 60, 
  borderWidth: 3, borderColor: Colors.purple500, backgroundColor: Colors.white, marginLeft: '10%', 
  marginRight: '10%', borderRadius: 40},

  sign_in: { fontFamily: 'Oswald-Regular', fontSize: 20, textAlign: 'center', marginTop: 10, 
    color: Colors.purple500, textDecorationLine: 'underline'},

  icon: {height: 45, width: 45}
})