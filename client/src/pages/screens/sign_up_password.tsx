import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MD2Colors as Colors } from 'react-native-paper'

export default function Password({navigation}) {
  return (
    <View style={[styles.view]}>
      <View>

        <View style={styles.title}>
            <Text style={styles.bold}>REGISTER TO</Text>
            <Text style={styles.regular}>LH Project</Text>
        </View>

        <View>
          <TextInput style={styles.textInput_1} placeholder="Password"/>
          <TextInput style={styles.textInput_1} placeholder="Verify Password"/>
        </View>

        <Text style={styles.button} onPress = {()=>navigation.navigate('Login')}> Done
        </Text>
        
        <Text style={styles.instruction}> Instructions : set your password and type it once more to verify.
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {backgroundColor: Colors.grey200, flex: 1, justifyContent: 'center'},

  title: {color: Colors.grey900, fontSize: 30, fontFamily: 'Oswald-Bold', textAlign:'center', marginBottom: 20, flexDirection: 'row', paddingLeft: '10%'},
  bold: {color: Colors.grey900, fontSize: 40, fontFamily: 'Oswald-Bold', textAlign:'center'},
  regular: {color: Colors.grey900, fontSize: 20, fontFamily: 'Oswald-Bold', textAlign:'center', paddingTop: 25, paddingLeft: 10},

  textInput_1: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, 
  padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, fontSize: 15},

  textInput_2: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, marginTop: 15, fontSize: 15,
  width: '35%', padding: 10},

  button: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, textAlign: 'center'},

  instruction: {fontFamily: 'Oswald-Bold', justifyContent: 'center', marginTop: 15, fontSize: 15, paddingHorizontal: 50},
})