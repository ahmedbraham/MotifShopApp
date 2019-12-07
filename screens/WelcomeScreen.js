import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header'
import myImage from '../images/Logo.png'
import mailIcon from '../images/mail.png'
import lockIcon from '../images/lock.png'
import FloatLabelTextInput from 'react-native-floating-label-text-input';
class WelcomeScreen extends React.Component {
  //static navigationOptions = { header: null }
  render() {
    return (
      <ScrollView bounces='false' style={{ flex: 1 }}>
        <View style={styles.loginContainer} >
          <TouchableOpacity style={styles.BtnLogin}
            onPress={() => { this.props.navigation.navigate('SignIn') }}
          >
            <Text style={styles.loginText} >LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BtnSignUp}
            onPress={() => { this.props.navigation.navigate('SignUp') }}
          >
            <Text style={styles.signUpText} >SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'white',
    flex: 1,
  },
  tabBar: {
    marginTop: 24,
    height: 60,
    width: '100%',
    backgroundColor: '#009CDD'
  },
  loginContainer: {
    flex: 1,
    paddingStart: 20,
    paddingEnd: 20
  },
  logoContainer: {
    alignSelf: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    resizeMode: 'contain'
  },
  BtnLogin: {
    flex: 1,
    backgroundColor: '#009CDD',
    width: '100%',
    height: 50,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  loginText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  BtnSignUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 50,
    marginTop: 10,
    borderColor: '#009CDD',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 100
  },
  signUpText: {
    color: '#009CDD',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
export default WelcomeScreen