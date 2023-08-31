import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { MD2Colors as Colors } from 'react-native-paper'
import { ScrollView, Switch } from 'react-native-gesture-handler';
import axios from "axios/index";
import { useState, useRef, useEffect } from "react"
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import DatePicker from 'react-native-date-picker'

const InputScreen = ({props}) => {

  const Url = "http://www.rats-lh.com:8080"

  
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState('')

  const [temp, setTemp] = useState(0.0);
  const [humid, setHumid] = useState(0.0);
  const [lamp, setLamp] = useState(false);

  const [lampStart, setLampStart] = useState(new Date());
  const [lampStop, setLampStop] = useState(new Date());
  const [pumpStart, setPumpStart] = useState(new Date());
  const [pumpHold, setPumpHold] = useState(0);

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setData(message);
  };

  const onError = (error) => {
    console.log(error);
  };

  const convertToKST = (date) => {
    let utc = new Date(date)
    let kst = utc.setHours(utc.getHours() + 9)
    let result = new Date(kst)
    return result
  }

  const onConnected = () => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.subscribe("/topic/messages/targetValue", onMessageReceived);
    }
  };

  const sendMessage = async (des) => {
      const data = {
        token: {props}.props,
        temp: temp,
        humid: humid,
        lamp_start: lampStart,
        lamp_stop: lampStop,
        pump_start: pumpStart,
        pump_hold: pumpHold
      };
      if (stompClient) {
        console.log("message sending.....");
        stompClient.send("/app/chat/" + des, {}, JSON.stringify(data));
      }
  };

  const changeLamp = async (des) => {
    const data = {
      token: {props}.props,
      state: lamp
    };
    if (stompClient) {
      console.log("message sending.....");
      stompClient.send("/app/chat/" + des, {}, JSON.stringify(data));
    }
};

useEffect(() => {
    const sock = new SockJS("http://www.rats-lh.com:8080/chat");
    const client = Stomp.over(sock);
    setStompClient(client);
  }, []);

  useEffect(() => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  return (
    <ScrollView>
      <View style={[styles.view]}>
      <View>
        <Text style={styles.title}>Set Temperature Settings</Text>
        {/*<View style={styles.information_box}>
          <Text style={styles.box_items_1}>Current Temp is :</Text>
          <Text style={styles.box_items_2}>{temp}°C</Text>
        </View>*/}
        <View> 
         <TextInput style={styles.textInput_1} onChangeText={value => setTemp(value)} keyboardType="number-pad"/>
        </View>
        <Text style={styles.instruction}> Instructions : if you set your start-time, pump will start at the time.
          and also, you can set how long pump will operate.
        </Text>
      </View>
    </View>

      <View style={styles.view}>
        <Text style={styles.title}>Set Lamp Settings</Text>
        <View style={styles.information_box}>
          <Text style={styles.box_items_1}>Lamp Status :</Text>
          <Text style={styles.box_items_2}>{lamp ? "ON" : "OFF"}</Text>
          <Switch onValueChange={() => {setLamp(!lamp)
            changeLamp('changeLampState')
          }} value = {lamp}/>
        </View>
        <View style={styles.row}>
        <Button title="Set Start Time" onPress={() => setOpen(true)} />
        <DatePicker modal open={open} date={lampStart}
          mode = 'time'
          onConfirm={(date) => {
            setOpen(false)
            const result = convertToKST(date)
            setLampStart(result)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

        <Button title="Set Stop Time" onPress={() => setOpen1(true)} />
        <DatePicker modal open={open1} date={lampStop}
          mode = 'time' 
          onConfirm={(date) => {
            setOpen1(false)
            const result = convertToKST(date)
            setLampStop(result)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

        </View>
        <Text style={styles.instruction}> Instructions : if you set your start-time, pump will start at the time.
          and also, you can set how long pump will operate.
        </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.title}>Set Pump Settings</Text>
        <TextInput style={styles.textInput_1} onChangeText={value => setPumpHold(value)} keyboardType="number-pad"/>
        <View style={styles.row}>
        <Button title="Set Start Time" onPress={() => setOpen2(true)} />
        <DatePicker modal open={open2} date={pumpStart}
          mode = 'time'
          onConfirm={(date) => { // 날짜 또는 시간 선택 시
            setOpen2(false)
            const result = convertToKST(date)
            setPumpStart(result)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        {/*<Button style={styles.button} title="Set Hold Time" onPress={() => setOpen3(true)} />
        <DatePicker modal open={open3} date={pumpHold}
          mode = 'time'
          onConfirm={(date) => {
            setOpen3(false)
            setPumpHold(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />*/}
        </View>
        <Text style={styles.instruction}> Instructions : if you set your start-time, pump will start at the time.
          and also, you can set how long pump will operate.
        </Text>
      </View>

      <View style={[styles.view]}>
      <View>
        <Text style={styles.title}>Set Humidity Settings</Text>
        {/*<View style={styles.information_box}>
          <Text style={styles.box_items_1}>Current Humidity :</Text>
          <Text style={styles.box_items_2}>{humid}%</Text>
        </View>*/}
        <View>
          <TextInput style={styles.textInput_1} onChangeText={value => setHumid(value)} keyboardType="number-pad"/>
        </View>
        <Text style={styles.instruction}> Instructions : if you set your start-time, pump will start at the time.
          and also, you can set how long pump will operate.
        </Text>
      </View>
    </View>

      <Text style={styles.button} onPress={() => {sendMessage("targetValue")}}> Apply </Text>
      <View style={styles.blank}/>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {backgroundColor: Colors.grey200, flex: 1, justifyContent: 'center', alignContent: 'center', borderBottomColor: Colors.grey500, borderBottomWidth: 3},

  title: {color: Colors.grey900, fontSize: 30, fontFamily: 'Oswald-Bold', textAlign:'center', margin: 20},

  textInput_1: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, 
  padding: 10, marginLeft: '10%', marginRight: '10%', marginTop: 15, fontSize: 15},

  textInput_2: {fontFamily: 'Oswald-Bold', backgroundColor: 'white', borderWidth: 3, borderRadius: 10, marginTop: 15, fontSize: 15,
  width: '35%', padding: 10},

  inputArea : {justifyContent: 'center', alignItems: 'center', flex : 1, flexDirection: 'row'},

  button: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginLeft: '10%', marginRight: '10%', margin: 15, textAlign: 'center'},

  instruction: {fontFamily: 'Oswald-Bold', justifyContent: 'center', marginTop: 15, fontSize: 15, paddingHorizontal: 50, paddingBottom: 20},

  row: {flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', margin: 10},

  information_box: {flexDirection: 'row', backgroundColor: Colors.grey900, 
    borderRadius: 10, padding: 10, marginHorizontal: '10%', justifyContent: 'space-evenly'},

  box_items_1: {color: Colors.white, fontSize: 30, fontFamily: 'Oswald-Bold', 
    borderRadius: 10, padding: 10, textAlign: 'center', justifyContent: 'center'},

  box_items_2: {color: Colors.lightGreen300, fontSize: 30, fontFamily: 'Oswald-Bold', 
    borderRadius: 10, padding: 10, textAlign: 'center', justifyContent: 'center'},

  switch : {alignItems: 'center'},

  blank: {backgroundColor: Colors.grey800 , padding: 30}
})

export default InputScreen