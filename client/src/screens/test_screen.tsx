 

import { View, Text, Button } from "react-native";

export default function ScreenB({ navigation }: any) {
  return (
    <View>
      <Text>I am a screen B</Text>
      <Button
        title="Go to ScreenA"
        onPress={() => navigation.navigate("ScreenA")}
      />
    </View>
  );
}