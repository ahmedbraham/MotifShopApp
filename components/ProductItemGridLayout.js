import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Dimensions ,Alert } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class ProductItemLinearLayout extends React.Component {



    _renderCartBotton = (product) => {
        var sourceImage = require('../images/ic_favorite_border.png')
        var textBotton = 'ADD TO CART'
        var colorBotton = '#009CDD'

        if (this.props.isProductInCart) {
            // Film dans nos favoris
            sourceImage = require('../images/ic_favorite.png')
            textBotton = 'DELETE'
            var colorBotton = '#ff0000'

        }
        return (
           
            <TouchableOpacity
            activeOpacity={0.7}
            style={[{ width: 100, height: 30, borderRadius: 9 },{ backgroundColor: colorBotton}]} 
            onPress={() => this._toggleCart(product.id, product.name,product.images,product.prix,product.average_rating,1)}
            >
            <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 7, fontSize: 12 }} >{textBotton}</Text>
        </TouchableOpacity>

        )
    }



    _displayFavoriteImage() {
        var sourceImage = require('../images/ic_favorite_border.png')
        if (this.props.isProductFavorite) {
            // Film dans nos favoris
            sourceImage = require('../images/ic_favorite.png')
        }
        return (
            <Image
                style={{ width: 30, height: 30, marginTop: 10, position: 'absolute', end: 10 }}
                source={sourceImage}
            />
        )
    }
    _toggleFavorite(productId, productName, productImage, productPrice, productAverage_rating) {
        const product = { id: productId, name: productName, images: productImage, prix: productPrice, average_rating: productAverage_rating }
        const action = { type: "TOGGLE_FAVORITE", value: product }
        this.props.dispatch(action)
    }

    displayAlertForLogin = () => {
        Alert.alert(
          "You must be logged in !!",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Sign In", onPress: () => this.props.navigation.navigate( 'SignIn') }
          ],
          { cancelable: false }
        );
      };

      

    //---------------------------------------------------------------------
    _toggleCart = async (productId, productName ,productImage ,productPrice , productAverage_rating) =>  {
        const userToken = await AsyncStorage.getItem('userToken')
        console.log('userToken' , userToken)

      //  if(userToken != null){
        console.log('our cart products', this.props.cartProducts)
        const product = { id: productId, name: productName, images: productImage, prix: productPrice, average_rating: productAverage_rating }
        const action = { type: "TOGGLE_CART", value: product }
        this.props.dispatch(action)
 
       // }else{
        // this.displayAlertForLogin()

        // }

    }
//---------------------------------------------------------------------




    render() {
        const { product, displayDetailForProduct } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => displayDetailForProduct(product.id, product.name, product.images, product.prix, product.average_rating ,  product.description)}
                style={styles.main_container}
            >
                <View style={[{ backgroundColor: '#fff', flex: 0, borderRadius: 5 }, styles.shadow]}  >
                    <TouchableOpacity style={styles.addToFavoriteicon_Container}
                        onPress={() => this._toggleFavorite(product.id, product.name, product.images, product.prix, product.average_rating)}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Image
                        resizeMode='contain'
                        style={styles.image}
                        source={{ uri: product.images }}
                    // source={{ uri: 'https://www.motoplanete.com/morini/zoom-700px/Moto-Morini-1200-Scrambler-2018-700px.jpg' }}
                    />
                    <View style={{ width: '100%', height: 1, backgroundColor: '#D3D3D3', marginTop: 5 }} ></View>
                    <View style={{ marginStart: 10, marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }} numberOfLines={1} >{product.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, height: 40, marginTop: 15, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }} >
                        <Text style={{ color: '#009CDD', alignSelf: 'center', fontSize: 9 }} >{product.prix} AED</Text>

                        {this._renderCartBotton(product)}



                    </View>
                </View>
                <View style={{ height: 10, backgroundColor: 'transparent' }}>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 0,
        // height:  (screenWidth/2)+160,
        width: (screenWidth / 2) - 15,
        marginStart: 10,
    },
    image: {
        marginTop: 45,
        width: (screenWidth / 2) - 50,
        height: (screenWidth / 2) - 50,
        marginStart: 15,
    },
    addToFavoriteicon: {
        width: 30,
        height: 30,
    },
    addToFavoriteicon_Container: {
        width: 70,
        height: 60,
        position: 'absolute',
        end: 0,
    },
    shadow: {
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
    }
})
const mapStateToProps = (state) => {
    return {
        favoritesProduct: state.favoritesProduct
    }
}
export default connect(mapStateToProps)(ProductItemLinearLayout)
