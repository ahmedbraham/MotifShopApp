import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header'
import myImage from '../images/Logo.png'
import userIcon from '../images/user.png'
import lockIcon from '../images/lock.png'
import NetInfo from "@react-native-community/netinfo";
import no_wifi from '../images/no-wifi.png';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { signIn } from '../API/api'
import { showMessage, hideMessage } from "react-native-flash-message";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.userName = ""
    this.password = ""
    this.state = {
      isConnected: false,
      isLoading: false,
      errorUserNameField: false,
      errorPasswordField: false,
    };
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={{ position: 'absolute', top: 494, zIndex: 10, alignSelf: 'center' }}>
          <ActivityIndicator size='large' color='#009CDD' />
        </View>
      )
    }
  }
  _storeItem = async (key, item) => {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));  
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  _checkConnexion = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({ isConnected: state.isConnected })
    });
  }
  _renderConnexionStateView = () => {
    if (!this.state.isConnected) {
      return (
        <View style={{
          height: 50, width: '100%', backgroundColor: 'rgba(209, 0, 0, 0.7)', position: 'absolute', bottom: 0, justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center'
          }} >
            <Image
              style={{ height: 30, width: 30, resizeMode: 'contain', marginEnd: 10 }}
              source={no_wifi}
            />
            <Text style={{ color: '#fff' }} >
              CHECK YOUR INTERNET CONNECTION !!
   </Text>
          </View>
        </View>
      )
    }
  }
  _userNameTextInputChanged(text) {
    this.userName = text
  }
  _passwordTextInputChanged(text) {
    this.password = text
  }
  _sheckSignIFormError() {
    let validate = true
    //------------------username validation--------------------------------------
    if (this.userName.length < 1) {
      this.setState({ errorUserNameField: true })
      validate = false
    } else {
      this.setState({ errorUserNameField: false })
    }
    //-------------------password validation-------------------------------------
    if (this.password.length < 1) {
      this.setState({ errorPasswordField: true })
      validate = false
    } else {
      this.setState({ errorPasswordField: false })
    }
    return validate
  }  
  _renderSignInView = () => {
    const { params } = this.props.navigation.state;  
    const userName = params ? params.userName : null;
    if (userName != null) {
      this.userName = this.props.navigation.state.params.userName
    }
    return (
      <View style={{ flex: 1 }}  >
        <ScrollView bounces='false' style={{ flex: 1 }}>
          {/*  <Header title="Sign in" goBack={this._goBack} />   */}
          <View style={styles.loginContainer} >
            <View style={styles.logoContainer} >
              <Image
                style={styles.logo}
                source={myImage}
              />
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                style={{ height: 20, width: 20, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
                source={userIcon}
              />
              <FloatLabelTextInput
                onChangeTextValue={(text) => this._userNameTextInputChanged(text)}
                placeholder={"User name"}
                value={this.userName}
              />
              {this.state.errorUserNameField ?
                <View
                  style={{ position: 'absolute', top: 44, end: 0, height: 1, width: '100%', backgroundColor: 'red' }}  >
                  <Text style={{ color: 'red', fontSize: 11, position: 'absolute', top: 5, end: 0 }} >Empty User Name !!</Text>
                </View>
                : null}
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                style={{ height: 24, width: 24, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
                source={lockIcon}
              />
              <FloatLabelTextInput
                onChangeTextValue={(text) => this._passwordTextInputChanged(text)}
                placeholder={"password"}
                secureTextEntry={true}
              />
              {this.state.errorPasswordField ?
                <View
                  style={{ position: 'absolute', top: 44, end: 0, height: 1, width: '100%', backgroundColor: 'red' }}  >
                  <Text style={{ color: 'red', fontSize: 11, position: 'absolute', top: 5, end: 0 }} >Empty Password !!</Text>
                </View>
                : null}
            </View>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => { this._forgetPassword() }}
              disabled={!this.state.isConnected}
            >
              <Text style={{ textAlign: 'right', color: '#989898' }} >Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BtnLogin}
              onPress={() => {
                if (this._sheckSignIFormError()) {
                  this.setState({ isLoading: true })
                  this._signIn()
                }
              }
              }
              disabled={!this.state.isConnected}
            >
              <Text style={styles.loginText} >LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BtnSignUp}
              onPress={() => { this.props.navigation.navigate('SignUp') }}
              disabled={!this.state.isConnected}
            >
              <Text style={styles.signUpText} >SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
  //----------------------------------------------------------------
  componentDidMount() {
    this._checkConnexion()
    this._storeItem('myData',
      {
        products: [
          { id: 1, title: 'product_1', qte: 36 },
          { id: 2, title: 'product_2', qte: 45 },
          { id: 3, title: 'product_3', qte: 66 },
          { id: 4, title: 'product_4', qte: 44 },
          { id: 5, title: 'product_5', qte: 92 }
        ],
        user: {
          firstName: 'ahmed',
          lastName: 'braham',
          ville: 'sousse'
        }
      }
    )
  }
  //----------------------------------------------------------------
  componentWillMount() {
    // Subscribe
    unsubscribe = NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      this.setState({ isConnected: state.isConnected })
    });
     // Unsubscribe
     this.unsubscribe
  }
  
  _saveToken = async (token) => {
    await AsyncStorage.setItem('userToken', token)
  }


  //----------------------------------------------------------------------------------------------
  _signIn() {
    signIn(this.userName, this.password).then((response) => {
      console.log(response)
      if (response.status == 1258) {
        this.setState({ isLoading: false })
        showMessage({
          message: "Login with success",
          type: "success",
        });
        this._saveToken(response.token)
        this.props.navigation.navigate('App') 
      } else {
        this.setState({ isLoading: false })
        showMessage({
          message: "error .. !!",
          type: "danger",
        });
      }
    })
  }
  //____________________________________________________________________________________________
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderSignInView()}
        {this._renderConnexionStateView()}
        {this._displayLoading()}
      </View>
    );
  }
  //-----------------------------------------------------------
  _goBack = () => {
    this.props.navigation.goBack()
  }
  //_signIn = async () => {
  // await AsyncStorage.setItem('userToken', 'Ahmed')
  // this.props.navigation.navigate('App')
  //  }
  _forgetPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  }
}
SignIn.navigationOptions = {
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
    marginBottom: 60,
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
export default SignIn