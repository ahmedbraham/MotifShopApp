import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import products from '../utils/products'
import ProductItemLinearLayout from '../components/ProductItemLinearLayout'
import Header from '../components/Header'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
class FavoriteScreen extends React.Component {
  _displayDetailForProduct = (id, title, image, price, averageRating) => {
    // console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("DetailsScreen", { idProduct: id, titleProduct: title, imageProduct: image, priceProduct: price, AverageRatingProduct: averageRating })
  }
  _renderNoFavoriteProduct = () => {
    if (this.props.favoritesProduct.length < 1)
      return (
        <View style={{ flex: 1, height: 300, top: 140, marginHorizontal: 20, alignItems: 'center', }}  >
          {/*  <Text style={{  fontSize:20 , color:'#de8f00' , fontWeight:'bold'}} >Your Favorites List Is Empty !!</Text>  */}
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ fontSize: 20, color: '#de8f00', fontWeight: 'bold' }} >Sorry...favorites list is empty !!</Animatable.Text>
        </View>
      )
  }
  render() {
    return (
      <View style={styles.container}> 
      <View style={styles.tabBar} >
            <Text style={styles.tabBarTitle} >Favorites</Text>
          </View>
        <ScrollView bounces='false'
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
         

          <View style={{ width : '100%' , height : 20}} >
            
          </View>
          {this._renderNoFavoriteProduct()}
          <FlatList
            style={{ marginTop: 60 }}
            data={this.props.favoritesProduct}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductItemLinearLayout product={item} displayDetailForProduct={this._displayDetailForProduct}
            isProductFavorite={(this.props.favoritesProduct.findIndex(product => product.id === item.id) !== -1) ? true : false}
            isProductInCart={(this.props.cartProducts.findIndex(product => product.id === item.id) !== -1) ? true : false} 

            />}
          />
        </ScrollView>
      </View>
    )
  }
  _goBack = () => {
    this.props.navigation.goBack()
  }
}
FavoriteScreen.navigationOptions = {
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
  }
});
const mapStateToProps = (state) => {
  return {
    favoritesProduct: state.favoritesProduct,
    cartProducts: state.cartProducts

  }
}
export default connect(mapStateToProps)(FavoriteScreen)