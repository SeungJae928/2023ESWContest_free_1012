import { Text, View, StyleSheet, TextInput } from 'react-native'
import { MD2Colors as Colors } from 'react-native-paper'

export default function PumpScreen({navigation}) {
  return (
    <View style={[styles.view]}>
      <View>
        <Text style={styles.title}>Set Lamp Settings</Text>
        <View style={styles.information_box}>
          <Text style={styles.box_items_1}>Lamp Status :</Text>
          <Text style={styles.box_items_2}>ON</Text>
        </View>
        <View style={styles.row}>
          <TextInput style={styles.textInput_2} placeholder="Start-Time"/>
          <TextInput style={styles.textInput_2} placeholder="End-Time"/>
        </View>
        <Text style={styles.button}> Apply </Text>
        <Text style={styles.instruction}> Instructions : if you set your start-time, pump will start at the time.
          and also, you can set how long pump will operate.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {backgroundColor: Colors.grey200, flex: 1, justifyContent: 'center'},

  title: {color: Colors.grey900, fontSize: 30, fontFamily: 'Oswald-Bold', textAlign:'center', marginBottom: 40},

  textInput_1: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, 
  padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, fontSize: 15},

  textInput_2: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, marginTop: 15, fontSize: 15,
  width: '35%', padding: 10},

  button: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, textAlign: 'center'},

  instruction: {fontFamily: 'Oswald-Bold', justifyContent: 'center', marginTop: 15, fontSize: 15, paddingHorizontal: 50},

  row: {flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly'},

  information_box: {flexDirection: 'row', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginHorizontal: '10%', justifyContent: 'space-evenly'},

  box_items_1: {color: Colors.white, fontSize: 30, fontFamily: 'Oswald-Bold', 
    borderRadius: 10, padding: 10, textAlign: 'center', justifyContent: 'center'},

  box_items_2: {color: Colors.lightGreen300, fontSize: 30, fontFamily: 'Oswald-Bold', 
    borderRadius: 10, padding: 10, textAlign: 'center', justifyContent: 'center'},
})