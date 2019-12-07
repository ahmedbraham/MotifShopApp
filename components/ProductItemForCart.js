import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
class ProductItemForCart extends React.Component {
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
    //---------------------------------------------------------------------
    _toggleCart(productId, productName, productImage, productPrice, productAverage_rating) {
        const product = { id: productId, name: productName, images: productImage, prix: productPrice, average_rating: productAverage_rating }
        const action = { type: "TOGGLE_CART", value: product }
        this.props.dispatch(action)
    }
    //---------------------------------------------------------------------
    render() {
        const { product, displayDetailForProduct } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => displayDetailForProduct(product.id, product.name, product.images, product.prix, product.average_rating)}
                style={styles.main_container}
            >
                <View style={[{ backgroundColor: '#fff', flex: 1, flexDirection: 'row', borderRadius: 5 }, styles.shadow]}  >
                    <TouchableOpacity style={styles.addToFavoriteicon_Container}
                        onPress={() => this._toggleFavorite(product.id, product.name, product.images, product.prix, product.average_rating)}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Image
                        resizeMode='contain'
                        style={styles.image}
                        source={{ uri: product.images }}
                    // source={{ uri: 'https://www.motoplanete.com/morini/zoom-700px/Moto-Morini-1200-Scrambler-2018-700px.jpg'}}
                    />
                    <View style={{ width: 1, height: '100%', backgroundColor: '#D3D3D3' }} ></View>
                    <View style={{ position: 'absolute', top: 20, left: 0, right: 0, bottom: 0, height: 40, marginStart: 140, marginEnd: 50 }}>
                        <Text numberOfLines={2} >{product.name}</Text>
                    </View>

                    <View style={{ position: 'absolute', top: 65, left: 0, right: 0, bottom: 0, height: 40, marginStart: 140, marginEnd: 50 }}>
                        <Text style={{ fontSize: 12  , color : 'green' }}  >Qte : {product.qte}</Text>
                    </View>


                    <View style={{ flexDirection: "row", flex: 1, height: 40, marginTop: 79, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }} >
                        <View style={{ flexDirection: "row", flex: 1, alignSelf: 'center', }} >
                            <Text style={{ color: '#009CDD', fontSize: 12, }} >{product.prix}</Text>
                            <Text style={{ color: '#009CDD', fontSize: 12, alignItems: 'flex-start', marginStart: 3 }} >AED</Text>
                        </View>


                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ width: 100, height: 30, backgroundColor: 'red', borderRadius: 9 }}
                            onPress={() => this._toggleCart(product.id, product.name, product.images, product.prix, product.average_rating)}
                        >
                            <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 7, fontSize: 12, fontWeight: 'bold' }} >DELETE</Text>
                        </TouchableOpacity>



                    </View>
                </View>


                <View style={{ height: 20, backgroundColor: 'transparent' }}>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        height: 140,
        paddingHorizontal: 10,
    },
    image: {
        width: 120,
        height: 110,
        margin: 5,
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
        favoritesProduct: state.favoritesProduct,
        cartProducts: state.cartProducts
    }
}
export default connect(mapStateToProps)(ProductItemForCart)
