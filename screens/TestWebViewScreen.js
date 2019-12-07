import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import myImage from '../images/Logo.png'
import mailIcon from '../images/mail.png'
import lockIcon from '../images/lock.png'
import userIcon from '../images/user.png'
import { WebView } from 'react-native-webview';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { testCart,clearCart,getCart } from '../API/api'
import { connect } from 'react-redux'

class TestWebViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

//---------------------------------------------------------- 
_clearCart () {
  clearCart().then((response) => {
    console.log(response)


    this.props.cartProducts.map((cart) => {
       
       this._testCartDetector(cart.id, cart.qte)
  
   });

   setTimeout(() => {
    this._hideSpinner()
  }, 1000);
   

  })
}
//____________________________________________________________  
componentDidMount(){
    //this._testCartDetector(2164, 1)
  
   this._clearCart()

  
  

}

 
  //---------------------------------------------------------- 
  _testCartDetector(product_id, qte_product) {
    testCart(product_id, qte_product).then((response) => {
      console.log(response)
    })
  }
//____________________________________________________________



  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={{ position: 'absolute', top: 340, zIndex: 10, alignSelf: 'center' }}>
          <ActivityIndicator size='large' color='#009CDD' />
        </View>
      )
    }
  }
  _hideSpinner = () => {
    console.log('web view loaded')
    //this._testCartDetector(2164, 2)
    //this._testCartDetector(2161, 10)
    this.setState({ isLoading: false })

     

    getCart().then((response) => {
      console.log('getCart',response.quantity)
    })

  }

_renderWebView = () =>{
  if (!this.state.isLoading){
  return(
<WebView
          onLoad={() => this._hideSpinner()}
          bounces='false'
          source={{ uri: 'http://preprodshop.motifdesign.ae/cart/' }}
          style={{ height: '100%' }}
        />
  )
}



}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="cart" goBack={this._goBack} />
        {this._displayLoading()}
        {this._renderWebView()}
      </View>
    );
  }
  _goBack = () => {
    this.props.navigation.goBack()
  }
}
TestWebViewScreen.navigationOptions = {
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


const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    cartProducts: state.cartProducts
  }
}

export default connect(mapStateToProps)(TestWebViewScreen)
 