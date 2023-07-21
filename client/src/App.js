import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './src/modules';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigations/Stack';
import {shoppingListApi} from './src/lib/api/shoppingList';
import SplashScreen from 'react-native-splash-screen';	// 라이브러리 추가!!

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: shoppingListApi,
      },
      serializableCheck: false,
    }),
});

const App = () => {
	// SplachScreen hide 하는 코드 추가한다!!!!!
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;