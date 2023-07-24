import {  NativeSyntheticEvent,  Text,  TextInputChangeEventData, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({navigation}) {
    const onChangeInput = (e:NativeSyntheticEvent<TextInputChangeEventData>)=>{
        console.log(e.nativeEvent.text)
    }
  return (
    <View>
        <Icon name="snake"/>
        <Text>로그인페이지 테스트입니다.</Text>
        <Text>Login to LH Project</Text>
    </View>
  );
}