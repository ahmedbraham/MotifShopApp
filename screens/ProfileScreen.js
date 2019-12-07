import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import profileImage from '../images/avatarHomme.jpg'
import AsyncStorage from '@react-native-community/async-storage';
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      myData: {
        products: [
        ],
        user: {
        }
      }
    };
  }
  _signOut = async () => {
    AsyncStorage.clear()
    setTimeout(() => {
      this.props.navigation.navigate('SignIn')
    }, 100);
  }
  _getUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      if (userToken !== null) {
        this.setState({ userToken: userToken })
      }
    } catch (e) {
      // error reading value
    }
  }
  _retrieveItem = async (key) => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({ myData: item })
      console.log("all my data = ", this.state.myData)
      console.log("user first name = ", this.state.myData.user.firstName)
      console.log("user last name = ", this.state.myData.user.lastName)
      console.log("user ville = ", this.state.myData.user.ville)
      console.log("user data = ", this.state.myData.user)
      console.log("all products = ", this.state.myData.products)
      console.log("product 1 = ", this.state.myData.products[0])
      console.log("product 2 id = ", this.state.myData.products[1].id)
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }
  _retrieveFavoritesProduct = async (key) => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      console.log("favoritesProduct from local storage = ", item)
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }
  componentDidMount() {
    { this._getUserToken() }
    { this._retrieveItem('myData') }
    { this._retrieveFavoritesProduct('favoritesProduct') }
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.tabBar} >
            <Text style={styles.tabBarTitle} >Profil</Text>
          </View>
        <ScrollView bounces='false'
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>this is the profile screen</Text>
            <View style={{ marginTop: 30, alignItems: 'center', overflow: 'hidden', borderRadius: 100, borderColor: '#C3C3C3', borderWidth: 0.5 }} >
              <Image
                style={{ height: 110, width: 110, resizeMode: 'contain', }}
                source={profileImage}
              />
            </View>
            <TouchableOpacity style={styles.BtnLogin}
              onPress={() => {
                this._signOut()
              }}
            >
              <Text style={styles.loginText} >LOGOUT</Text>
            </TouchableOpacity>
          {/*   <Text style={{ marginTop: 20, color: 'green' }}>User Token  =  {this.state.userToken}</Text>    */}  
          </View>
        </ScrollView>
      </View>
    );
  }
}
ProfileScreen.navigationOptions = {
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
