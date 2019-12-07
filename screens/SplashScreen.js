import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Alert,
  TouchableHighlight
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import logo from "./assets/Logo.png";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      quantite: 1,
      myButtonStyle: {
        backgroundColor: "#319ef7",
        borderRadius: 100,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }
    };
  }
  _showAlertWithDelay = () => {
    setTimeout(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      Alert.alert("Alert Shows After 5 Seconds of Delay.");
    }, 4000);
  };
  onPressButton() { }
  onLongPressButton() { }
  onShowUnderlay = () => {
    this.setState({
      myButtonStyle: {
        backgroundColor: "#319ef7",
        borderRadius: 100,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });
  };
  onHideUnderlay = () => {
    this.setState({
      myButtonStyle: {
        backgroundColor: "#319ef7",
        borderRadius: 100,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });
  };
  render() {
    console.log("This should be printed in console!");
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150, resizeMode: "contain" }}
          source={logo}
        />
        <View style={{ width: "100%", height: 30, marginBottom: 20 }}>
          <SkypeIndicator color="#A2A355" />
        </View>
        <View style={{
          height: 100, width: 250, justifyContent: 'center',
          alignItems: 'center'
        }}>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    borderRadius: 100,
    width: 260,
    alignItems: "center",
    backgroundColor: "#9813FF"
  },
  buttonText: {
    color: "white"
  }
});
