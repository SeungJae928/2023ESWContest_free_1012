import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Alert} from 'react-native'
import {MD2Colors as Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const FloatingIcon = ({props}) => {
  const username = "admin";
  const [data, setData] = useState();
  const [stompClient, setStompClient] = useState(null);

  /*const onBuzzerClick = (led) => {
    sendMessage("buzzer on");
    setTimeout(() => {
      sendMessage("buzzer off");
    }, 500);
  };*/

  /*useEffect(() => {
    if (stompClient !== undefined && stompClient !== null) {
      const { led1, led2 } = leds;
      sendMessage(led1 === true ? "led1 off" : "led1 on"); // for relay but same logic
      sendMessage(led2 != true ? "led2 off" : "led2 on"); // for led
    }
  }, [leds]);*/

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
          setData(message);
      };
    
      const onError = (error) => {
        console.log(error);
      };

      const onConnected = () => {
        if (stompClient !== undefined && stompClient !== null) {
          stompClient.subscribe("/topic/messages/createCage", onMessageReceived);
        }
      };
    
      const sendMessage = async (msg, des) => {
        if (msg !== "") {
          const data = {
            token: {props}.props,
            serial: "",
            cage_name: msg,
          };
          if (stompClient) {
            console.log("message sending.....");
            stompClient.send("/app/chat/" + des, {}, JSON.stringify(data));
          }
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

    return(
        <View style={styles.absoluteView}>
            <Icon name="plus" style={styles.icon} size={60} onPress={() => {sendMessage("testname", "createCage")}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    icon: {color: Colors.purple500},
    absoluteView:{
        alignItems: 'center', flexDirection: 'row', position: 'absolute', backgroundColor: Colors.white,
        borderRadius: 30, right: 15, bottom : 15, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5
    }
})

export default FloatingIcon;