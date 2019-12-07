import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Header from '../components/Header'
import myImage from '../images/Logo.png'
import mailIcon from '../images/mail.png'
import lockIcon from '../images/lock.png'
import FloatLabelTextInput from 'react-native-floating-label-text-input';
class ForgotPasswordScreen extends React.Component {
  //static navigationOptions = { header: null }
  render() {
    return (
      <ScrollView bounces='false' style={{ flex: 1 }}>
        <Header title="Reset Password" goBack={this._goBack} />
        <View style={styles.loginContainer} >
          <View style={styles.logoContainer} >
            <Image
              style={styles.logo}
              source={myImage}
            />
          </View>
          <View      >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30, color: '#626366', alignSelf: 'center' }} >Yo! Forgot Your Password?</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10, color: '#626366' }}  >No worries! Enter your email  and we will send  you a resert</Text>
          </View>
          <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
              source={mailIcon}
            />
            <FloatLabelTextInput
              placeholder={"Email"}
            />
          </View>
          <TouchableOpacity style={styles.BtnLogin}
            onPress={() => { }}
          >
            <Text style={styles.loginText} >SEND REQUEST</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  _goBack = () => {
    this.props.navigation.goBack()
  }
  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'Ahmed')
    this.props.navigation.navigate('App')
  }
}
ForgotPasswordScreen.navigationOptions = {
  header: null,
};
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
export default ForgotPasswordScreen