import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import products from '../utils/products'
import ProductItemForCart from '../components/ProductItemForCart'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import cartIcon from "../images/cartIcon.png";
import { testCart ,clearCart} from '../API/api'
class MyShoppingCartScreen extends React.Component {

   //---------------------------------------------------------- 
   _clearCart () {
    clearCart().then((response) => {
      console.log(response)
    })
  }
  //____________________________________________________________
  //---------------------------------------------------------- 
  _testCartDetector(product_id, qte_product) {
    testCart(product_id, qte_product).then((response) => {
      console.log(response)
    })
  }
  //____________________________________________________________
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  _displayDetailForProduct = (id, title, image, price, averageRating) => {
    // console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("DetailsScreen", { idProduct: id, titleProduct: title, imageProduct: image, priceProduct: price, AverageRatingProduct: averageRating })
  }
  //_______________________________________________________________________________________________________________________________________________________________________
  _renderNoFavoriteProduct = () => {
    if (this.props.cartProducts.length < 1)
      return (
        <View style={{ flex: 1, height: 300, top: 140, marginHorizontal: 20, alignItems: 'center', }}  >
          {/*  <Text style={{  fontSize:20 , color:'#de8f00' , fontWeight:'bold'}} >Your Favorites List Is Empty !!</Text>  */}
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ fontSize: 20, color: '#de8f00', fontWeight: 'bold' }} >Sorry...empty cart !!</Animatable.Text>
        </View>
      )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBar} >
          <Text style={styles.tabBarTitle} >Cart</Text>
        </View>
        <ScrollView bounces='false'
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        {this._renderNoFavoriteProduct()}
        <View style={{height : 20 , width:'100%'}} ></View>
        <FlatList
          style={{ marginTop: 60 }}
          data={this.props.cartProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItemForCart product={item} displayDetailForProduct={this._displayDetailForProduct}
          isProductFavorite={(this.props.favoritesProduct.findIndex(product => product.id === item.id) !== -1) ? true : false}
          />}
        />
       
        </ScrollView> 
        {this._renderFloatingButton()}
      </View>
    )
  }


componentDidMount(){ 
  
  this._clearCart()



}

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  _goBack = () => {
    this.props.navigation.goBack()
  }
  //________________________________________________________________________________________________________________________________________________________________
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  _renderFloatingButton() {
    return (
      <View style={[{ backgroundColor: '#009CDD', height: 55, width: 55, position: "absolute", bottom: 16, end: 16, zIndex: 10, borderRadius: 100, overflow: 'hidden' }, styles.shadow]} >
        <TouchableHighlight
          style={{ height: 55, width: 55, overflow: 'hidden', borderRadius: 100 }}
          onPress={() => { this.props.navigation.navigate('testWebView')
          this._clearCart()
           }}
          underlayColor="#6BCDF5"
        >
          <View style={{ height: 55, width: 55, justifyContent: 'center', alignItems: 'center', borderRadius: 100, overflow: 'hidden' }} >
            <Image style={{ width: 30, height: 30, resizeMode: "contain" }} source={cartIcon} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  //________________________________________________________________________________________________________________________________________________________________
}
MyShoppingCartScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  contentContainer: {
    paddingTop: 0,
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
  }, shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 4,
      }
    })
  },
});
const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    cartProducts: state.cartProducts
  }
}
export default connect(mapStateToProps)(MyShoppingCartScreen)
