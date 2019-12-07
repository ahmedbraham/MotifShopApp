import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image } from 'react-native';
import { createSwitchNavigator,  createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'  
import { createDrawerNavigator } from 'react-navigation-drawer';


import HomeScreen from '../screens/HomeScreen';
import Favorite from '../screens/FavoriteScreen';
import ShoppingCart from '../screens/MyShoppingCartScreen';
import Profile from '../screens/ProfileScreen';
import Settings from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DrawerScreen from '../screens/DrawerScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TestWebViewScreen from '../screens/TestWebViewScreen';
import AsyncStorage from '@react-native-community/async-storage';
//import {isConnected} from '../utils/functions';
isConnected = () => {
  return false
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
})
//-------------------------------- MyTabNavigator ---------------------------------------------
const MyTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../images/homeIcon.png')}
          style={styles.icon}
          resizeMode="contain"
        /> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../images/fovoriteIcon.png')}
          style={styles.icon} /> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Cart: {
    screen: ShoppingCart,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../images/shoppingCart.png')}
          style={styles.icon} />
      }
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../images/profileIcon.png')}
          style={styles.icon} />
      },
      // tabBarOnPress: ({navigation}) => {  navigation.navigate('Profile') },
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../images/settingIcon.png')}
          style={styles.icon} />
      }
    }
  }
},
  {
    tabBarOptions: {
      activeBackgroundColor: '#0294d1', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: 'transparent', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
      ,
      labelStyle: {
        fontSize: 12,
        color: '#fff'
      },
      style: {
        backgroundColor: '#009CDD',
      },
    }
  })
//________________________________________ MyTabNavigator ________________________________________
const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: MyTabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  DetailsScreen: {
    screen: DetailsScreen
  },
  testWebView: TestWebViewScreen
});
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
  },
  //settings DrawerNavigator -----------------------
  {
    contentComponent: DrawerScreen,
    initialRouteName: 'Home',
    hideStatusBar: false,
    drawerBackgroundColor: 'rgba(0,119,164,.9)',
    overlayColor: 'rgba(0,0,0,.8)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#0A698D',
    },
  }
  //settings DrawerNavigator -----------------------
);
//___________________________________________________________
const AuthStackNavigator = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
});
const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  // AuthLoading: SignUpScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})
export default createAppContainer(AppSwitchNavigator)
