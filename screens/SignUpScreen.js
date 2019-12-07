import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import myImage from '../images/Logo.png'
import mailIcon from '../images/mail.png'
import lockIcon from '../images/lock.png'
import userIcon from '../images/user.png'
import { register } from '../API/api'
import { showMessage, hideMessage } from "react-native-flash-message";
import FloatLabelTextInput from 'react-native-floating-label-text-input';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.username = ""
    this.email = ""
    this.password = ""
    this.confirmPassword = ""
    this.state = {
      isConnected: false,
      registerWithSuccess: false,
      isLoading: false,
      errorUserNameField: false,
      errorEmailField: false,
      errorEmaildMessage: false,
      errorPasswordField: false,
      errorConfirmPasswordField: false,
      errorConfirmPasswordMessage: '',
    };
  }
  _sheckRegisterFormError() {
    let validate = true
    //------------------username validation--------------------------------------
    if (this.username.length < 1) {
      this.setState({ errorUserNameField: true })
      validate = false
    } else {
      this.setState({ errorUserNameField: false })
    }
    //--------------------email validation------------------------------------
    if (this.email.length < 1) {
      this.setState({ errorEmailField: true, errorEmaildMessage: 'Enter your Email' })
      validate = false
    } else if (this.email.length > 0) {
      let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (reg.test(this.email) === false) {
        this.setState({ errorEmailField: true, errorEmaildMessage: 'Email form is not correct' })
        validate = false
      } else {
        this.setState({ errorEmailField: false })
      }
    }
    //-------------------password validation-------------------------------------
    if (this.password.length < 6) {
      this.setState({ errorPasswordField: true })
      validate = false
    } else {
      this.setState({ errorPasswordField: false })
    }
    //------------------confirmPassword validation--------------------------------------
    if (this.confirmPassword.length < 1) {
      this.setState({ errorConfirmPasswordField: true, errorConfirmPasswordMessage: 'Confirm Your Password!' })
      validate = false
    } else if (this.confirmPassword.length > 0 && (this.confirmPassword != this.password)) {
      this.setState({ errorConfirmPasswordField: true, errorConfirmPasswordMessage: 'the 2 passwords are not identical!' })
      validate = false
    } else {
      this.setState({ errorConfirmPasswordField: false })
    }
    return validate
  }
  _renderRegisterFormError() {
    return (
      <View>
        <Text style={{ color: 'red' }} > this is an error</Text>
      </View>
    )
  }
  _renderRegistrationForm() {
    return (
      <View>
        <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
          <Image
            style={{ height: 20, width: 20, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
            source={userIcon}
          />
          <FloatLabelTextInput
            onChangeTextValue={(text) => this.username = text}
            placeholder={"User name"}
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
            style={{ height: 20, width: 20, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
            source={mailIcon}
          />
          <FloatLabelTextInput
            onChangeTextValue={(text) => this.email = text}
            placeholder={"Email"}
          />
          {this.state.errorEmailField ?
            <View
              style={{ position: 'absolute', top: 44, end: 0, height: 1, width: '100%', backgroundColor: 'red' }}  >
              <Text style={{ color: 'red', fontSize: 11, position: 'absolute', top: 5, end: 0 }} > {this.state.errorEmaildMessage} </Text>
            </View>
            : null}
        </View>
        <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
          <Image
            style={{ height: 24, width: 24, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
            source={lockIcon}
          />
          <FloatLabelTextInput
            onChangeTextValue={(text) => this.password = text}
            placeholder={"password"}
            secureTextEntry={true}
          />
          {this.state.errorPasswordField ?
            <View
              style={{ position: 'absolute', top: 44, end: 0, height: 1, width: '100%', backgroundColor: 'red' }}  >
              <Text style={{ color: 'red', fontSize: 11, position: 'absolute', top: 5, end: 0 }} >Password must contain at least 6 characters!</Text>
            </View>
            : null}
        </View>
        <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }} >
          <Image
            style={{ height: 24, width: 24, resizeMode: 'contain', marginEnd: 20, marginTop: 5 }}
            source={lockIcon}
          />
          <FloatLabelTextInput
            onChangeTextValue={(text) => this.confirmPassword = text}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
          {this.state.errorConfirmPasswordField ?
            <View
              style={{ position: 'absolute', top: 44, end: 0, height: 1, width: '100%', backgroundColor: 'red' }}  >
              <Text style={{ color: 'red', fontSize: 11, position: 'absolute', top: 5, end: 0 }} >{this.state.errorConfirmPasswordMessage}</Text>
            </View>
            : null}
        </View>
      </View>
    )
  }
  _register() {
    if (this.email.length > 0) {
      this.setState({ isLoading: true })
      register(this.username, this.email, this.password).then((response) => {
        console.log('response register', response)
        if (response.code == 1) {
          this.setState({ isLoading: false })
          showMessage({
            message: "successful registration",
            type: "success",
          });
          this.props.navigation.navigate('SignIn', { userName: this.username })
        } else if (response.code == 6) {
          this.setState({ isLoading: false })
          showMessage({
            message: "error .. !! Username already exists",
            type: "danger",
          });
        }
      })
    }
  }
  render() {
    return (
      <ScrollView bounces='false' style={{ flex: 1 }}>
        <Header title="Sign Up" goBack={this._goBack} />
        <View style={styles.loginContainer} >
          <View style={styles.logoContainer} >
            <Image
              style={styles.logo}
              source={myImage}
            />
          </View>
          {this._renderRegistrationForm()}
          <TouchableOpacity style={styles.BtnRegister}
            onPress={() => {
              if (this._sheckRegisterFormError()) {
                //Z   this._sheckRegisterFormError()
                this._register()
              }
            }
            }
          >
            <Text style={styles.loginText} >REGISTER</Text>
          </TouchableOpacity>
        </View>
        {this._displayLoading()}
      </ScrollView>
    );
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
  _goBack = () => {
    this.props.navigation.goBack()
  }
}
SignUp.navigationOptions = {
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
  BtnRegister: {
    flex: 1,
    backgroundColor: '#009CDD',
    width: '100%',
    height: 50,
    marginTop: 45,
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
export default SignUp