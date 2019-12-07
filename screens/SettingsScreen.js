import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.tabBar} >
            <Text style={styles.tabBarTitle} >Settings</Text>
          </View>
        <ScrollView bounces='false'
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>this is the Setting screen</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
SettingsScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    height: 60,
    width: '100%',
    backgroundColor: '#009CDD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarTitle: {    
    color: '#FFF',
    fontSize: 18,
  }
});
