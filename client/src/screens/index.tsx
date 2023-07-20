
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import ScreenB from "./test_screen";
import ScreenA from "./start_screen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenA">
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen name="ScreenB" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}