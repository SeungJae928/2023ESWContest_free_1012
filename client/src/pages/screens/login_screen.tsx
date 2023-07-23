import {  NativeSyntheticEvent,  Text,  TextInputChangeEventData, View } from 'react-native';

export default function LoginScreen({navigation}) {
    const onChangeInput = (e:NativeSyntheticEvent<TextInputChangeEventData>)=>{
        console.log(e.nativeEvent.text)
    }
  return (
    <View>
        <View>로그인페이지 테스트입니다.</View>
        <button>Login to LH Project</button>
    </View>
  );
}