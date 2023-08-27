import { Text, View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD2Colors as Colors } from 'react-native-paper'
import axios from "axios";
import { useState } from "react"

const PumpScreen = (props) => {

  const Url = "http://10.0.2.2:8080"

  const [state, setState] = useState(false);

  const changePumpState = async (): Promise<void> => {

    const currentState = await axios.post(Url + "/api/cage/getCageInfo", {
      token: props.props
    })
        .then((res) => {
          setState(res.data.lamp)
        })
        .catch((e) => {
          console.log(e)
        })

    const changeState = await axios.post(Url + "/api/cage/setPumpState", {
      token: props.props,
      value: state
    })
        .then((response) => {
          setState(!state)
          console.log(state)
        })
        .catch((e) => {
          console.log(e)
        })
  }

  return (
    <View style={[styles.view]}>
      <View>
        <Text style={styles.title}>Set Pump Settings</Text>
        <View>
          <TextInput style={styles.textInput} placeholder="Start Time"/>
          <TextInput style={styles.textInput} placeholder="Seconds"/>
        </View>
        <Text style={styles.button} onPress={changePumpState}> Apply </Text>
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

  textInput: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, 
  padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, fontSize: 15},

  button: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, textAlign: 'center'},

  icon: {height: 45, width: 45},

  instruction: {fontFamily: 'Oswald-Bold', justifyContent: 'center', marginTop: 15, fontSize: 15, paddingHorizontal: 50}
})

export default PumpScreen