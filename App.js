import React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import Navigation from './navigation/Navigation' //default export donc l'importation est avec le nom de la classe 
import GeneralStatusBarColor from './components/GeneralStatusBarColor';
import { Provider } from 'react-redux'
import Store, { persistor } from './Store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from "react-native-flash-message";
import 'react-native-gesture-handler'

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={{ backgroundColor: '#009CDD', flex: 1 }}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <GeneralStatusBarColor backgroundColor="#009CDD"
            barStyle="light-content" />
          <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
              <Navigation />
          </PersistGate>
          </Provider>
          <FlashMessage position="bottom" floating={false} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
