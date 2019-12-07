import React from 'react';
import { ScrollView, StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import myImage from '../images/Logo.png'
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
export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super();
        this.loadApp()
    }
    loadApp = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        setTimeout(() => {
            // this.props.navigation.navigate(userToken ? 'App' : 'SignIn')
            this.props.navigation.navigate('App')
            //  this.props.navigation.navigate(userToken ? 'App' : 'SingnIn')
        }, 1500);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    style={{ width: 120, height: 120 }}
                    source={myImage}
                />
                <View style={{ width: "100%", height: 30, marginBottom: 20 }}>
                    <SkypeIndicator color="#A2A355" />
                </View>
                {/*<ActivityIndicator size="large" color="#0000ff" />  */}
            </View>
        );
    }
}
AuthLoadingScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
