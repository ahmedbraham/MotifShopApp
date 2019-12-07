import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native'
class ProductItemForFavoriteScreen extends React.Component {



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



    render() {
        const { product, displayDetailForProduct } = this.props
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => displayDetailForProduct(product.id, product.name, product.images, product.prix, product.average_rating)}
                style={styles.main_container}
            >
                <View style={{ backgroundColor: '#fff', flex: 1, flexDirection: 'row', borderRadius: 5 }}  >
                    <Image
                        resizeMode='contain'
                        style={styles.image}
                        source={{ uri: product.images }}
                    />
                    <View style={{ width: 1, height: '100%', backgroundColor: '#D3D3D3' }} ></View>
                    <View style={{ position: 'absolute', top: 20, left: 0, right: 0, bottom: 0, height: 40, marginStart: 140, marginEnd: 50 }}>
                        <Text numberOfLines={2} >{product.title}</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, height: 40, marginTop: 79, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }} >
                        <Text style={{ color: '#009CDD', alignSelf: 'center', fontSize: 10 }} >{product.prix} AED</Text>
                        {this._renderCartBotton(product)}
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
        width: 30,
        height: 30,
        position: 'absolute',
        end: 10,
        top: 10,
    }
})
export default ProductItemForFavoriteScreen