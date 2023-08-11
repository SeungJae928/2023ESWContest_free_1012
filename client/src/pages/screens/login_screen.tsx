import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD2Colors as Colors } from 'react-native-paper'

export default function LoginScreen({navigation}) {
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
        <TouchableOpacity onPress = {()=>navigation.navigate('SignUp_Password')}>
          <Image style={[styles.icon]} source={require('../../images/naver.png')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>navigation.navigate('SignUp_Password')}>
          <Image style={[styles.icon]} source={require('../../images/kakaotalk.png')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>navigation.navigate('SignUp_Password')}>
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