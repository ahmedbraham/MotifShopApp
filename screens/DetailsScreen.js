import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, ActivityIndicator, Image, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import plusIcon from "../images/addToQteIcon.png";
import moinsIcon from "../images/deleteFromQteIcon.png";
import cartIcon from "../images/cartIcon.png";
import Header from '../components/Header'
import backIcon from '../images/back.png'
import TimedSlideshow from '../utils/react-native-timed-slideshow/src';
import { connect } from 'react-redux'
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      quantite: 1, 
      isLoading: true
    };
  }
  _toggleFavorite(productId, productName, productImage, productPrice, productAverage_rating) {
    const product = { id: productId, name: productName, images: productImage, prix: productPrice, average_rating: productAverage_rating }
    const action = { type: "TOGGLE_FAVORITE", value: product }
    this.props.dispatch(action)
  }

    //---------------------------------------------------------------------
    _toggleCart = async (productId, productName ,productImage ,productPrice , productAverage_rating ,qte ) =>  {
      const userToken = await AsyncStorage.getItem('userToken')

    //  if(userToken != null){
      const product = { id: productId, name: productName, images: productImage, prix: productPrice, average_rating: productAverage_rating , qte : qte}
      const action = { type: "TOGGLE_CART", value: product }
      this.props.dispatch(action)

     // }else{
      // this.displayAlertForLogin()

      // }

  }



  _renderCartBotton = () => {
    var sourceImage = require('../images/ic_favorite_border.png')
    var textBotton = 'ADD TO CART'
    var colorBotton = '#009CDD'

    if ( this.props.cartProducts.findIndex(product => product.id === this.props.navigation.state.params.idProduct) !== -1 ) {
        // produit dans le chariot
        sourceImage = require('../images/ic_favorite.png')
        textBotton = 'DELETE FROM CART'
        var colorBotton = '#ff0000'

    }
    return (
       
      <TouchableHighlight
      style={{ borderRadius: 100 }}
      onHideUnderlay={this.onHideUnderlay}
      onShowUnderlay={this.onShowUnderlay}
      onPress={() => this._toggleCart( 
        this.props.navigation.state.params.idProduct,
        this.props.navigation.state.params.titleProduct,
        this.props.navigation.state.params.imageProduct,
        this.props.navigation.state.params.priceProduct,
        this.props.navigation.state.params.AverageRatingProduct,
        this.state.quantite

      )}
       underlayColor="#000"
    >
      <View style={[{   height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center' },{ backgroundColor: colorBotton}]}>
        <Text style={{ color: '#fff' }}>{textBotton}</Text>
      </View>
    </TouchableHighlight>

    )
}

//---------------------------------------------------------------------
  _displayFavoriteImage() {
    var sourceImage = require('../images/ic_favorite_border.png')
    if (this.props.favoritesProduct.findIndex(item => item.id === this.props.navigation.state.params.idProduct) !== -1) {
      // produit dans nos favoris
      sourceImage = require('../images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }



  _renderHeader() {
    const { isLoading } = this.state
    return (
      <View style={styles.tabBar} >
        <Text style={styles.tabBarTitle} >Details</Text>
        <TouchableOpacity
          style={{ position: 'absolute', start: 0, padding: 20, paddingEnd: 40 }}
          //onPress={() => this.props.navigation.openDrawer()}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
            source={backIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  addToQuantite() {
    this.setState({
      quantite: this.state.quantite + 1
    });
  }
  deleteFromQuantite() {
    this.setState({
      quantite: this.state.quantite > 1 ? this.state.quantite - 1 : 1
    });
  }
  displayAlert = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };
  _renderSlideShow() {
    // const { footerStyle } = this.props;
    const { isLoading } = this.state
    if (isLoading == false) {
      return (
        <View style={styles.imageContainer}>
          <Image
            resizeMode='contain'
            style={{ height: 160 }}
            source={{ uri: this.props.navigation.state.params.imageProduct }}
          />
        </View>
      );
    }
  }// End renderSlideShow()
  onPressButton() { }
  _onPressFloatButton = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

     

  
  _renderScrollView() {
    const { isLoading } = this.state
    if (isLoading == false) {
      return (
        <ScrollView bounces='false' >
          <View style={styles.scrollViewContainer} >
            {this._renderSlideShow()}
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <View style={{ height: 0.5, marginTop: 10, backgroundColor: '#D4D4D4' }}></View>
              <View style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>{this.props.navigation.state.params.titleProduct}</Text>
                <TouchableOpacity
                  style={styles.favorite_container}
                  onPress={() => this._toggleFavorite(
                    this.props.navigation.state.params.idProduct,
                    this.props.navigation.state.params.titleProduct,
                    this.props.navigation.state.params.imageProduct,
                    this.props.navigation.state.params.priceProduct,
                    this.props.navigation.state.params.AverageRatingProduct,
                  )}>
                  {this._displayFavoriteImage()}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10, alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#009CDD', fontSize: 15, fontWeight: 'bold' }}>: In stock</Text>
                <Text style={{ color: '#6C6C6C', fontSize: 10, marginStart: 10 }}>{this.props.navigation.state.params.priceProduct} AED </Text>
              </View>
              <View style={{ width: 90, alignSelf: 'flex-end' }}  >
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={20}
                  showRating={false}
                  onFinishRating={this.ratingCompleted}
                  readonly={true}
                  startingValue={parseInt(this.props.navigation.state.params.AverageRatingProduct, 10)}
                />
              </View>
              <View style={{ height: 0.5, marginTop: 5, backgroundColor: '#D4D4D4' }}></View>
              {/*---------------------------------------------- qte et plus et moins ----------------------------------------------------------------------- */}
              <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', }}>
                <Text style={{ color: '#009CDD', fontSize: 12, fontWeight: 'bold' }}>: Qty</Text>
                <View style={{ flexDirection: "row", height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    tyle={{ height: 50, width: 50 }}
                    // onHideUnderlay={this.onHideUnderlay}
                    // onShowUnderlay={this.onShowUnderlay}
                    onPress={() => this.deleteFromQuantite()}
                    activeOpacity={0.5}
                  >
                    <View style={{ borderColor: '#707070', borderWidth: 1, height: 40, width: 50, justifyContent: 'center', alignItems: 'center' }} >
                      <Image disabled={true} style={{ width: 24, height: 24, resizeMode: "contain" }} source={moinsIcon} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ minWidth: 55, alignItems: "center" }}>
                    <Text style={{ color: '#7F7F7F', fontSize: 25, fontWeight: 'bold', marginHorizontal: 10 }}>{this.state.quantite}</Text>
                  </View>
                  <TouchableOpacity
                    tyle={{ height: 50, width: 50 }}
                    // onHideUnderlay={this.onHideUnderlay}
                    // onShowUnderlay={this.onShowUnderlay}
                    onPress={() => this.addToQuantite()}
                    activeOpacity={0.5}
                  >
                    <View style={{ borderColor: '#707070', borderWidth: 1, height: 40, width: 50, justifyContent: 'center', alignItems: 'center' }} >
                      <Image style={{ width: 24, height: 24, resizeMode: "contain" }} source={plusIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/*---------------------------------------------------les boutons------------------------------------------------------------------ */}
              <View style={{ marginTop: 20 }}
              >
               



               {this._renderCartBotton( )}




















                <TouchableHighlight
                  style={{ borderRadius: 100, marginTop: 10 }}
                  onHideUnderlay={this.onHideUnderlay}
                  onShowUnderlay={this.onShowUnderlay}
                  onPress={() => this._toggleFavorite(
                    this.props.navigation.state.params.idProduct,
                    this.props.navigation.state.params.titleProduct,
                    this.props.navigation.state.params.imageProduct,
                    this.props.navigation.state.params.priceProduct,
                    this.props.navigation.state.params.AverageRatingProduct,
                  )  }
                  onLongPress={this.onLongPressButton}
                  underlayColor="#FDF3E0"
                >
                  <View style={{ backgroundColor: 'transparent', borderColor: '#FEB633', borderWidth: 1, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#FEB633', fontWeight: 'bold' }}>ADD TO FAVOURITES</Text>
                  </View>
                </TouchableHighlight>
              </View>
              {/*--------------------------------------------------------------------------------------------------------------------- */}
              <View style={{ height: 0.5, marginTop: 20, backgroundColor: '#D4D4D4' }}></View>
              {/*--------------------------------------------------------------------------------------------------------------------- */}
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text style={{ color: '#009CDD', fontSize: 12, fontWeight: 'bold' }}>Product Overview</Text>
              </View>
              <Text style={{ color: '#3C3B3B', fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>Description</Text>
              <Text style={{ color: '#989898', fontSize: 10, marginTop: 10, marginBottom: 45 }}> {this.props.navigation.state.params.description}</Text>
            </View>
          </View>
        </ScrollView>
      )
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  componentDidMount() {
    // getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
    setTimeout(() => {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      this.setState({
         
        isLoading: false
      })
    }, 5);
    // })     
  }
  render() {
    console.log('my favorite Product', this.props.favoritesProduct)
    return (
      <View style={styles.container} >
        {this._displayLoading()}
       
        {this._renderHeader()}
        {this._renderScrollView()}
      </View>
    );
  }
}
DetailsScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 70,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 3,
      }
    }),
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
  }, tabBar: {
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
  },
  imageContainer: {
    flex: 0,
    width: '100%',
  },
  button: {
    borderRadius: 100,
    width: 260,
    alignItems: "center",
    backgroundColor: "#9813FF"
  },
  buttonText: {
    color: "white"
  },
  favorite_container: {
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    end: 0
  },
  favorite_image: {
    marginTop: 10,
    width: 30,
    height: 30
  }
})
const mapStateToProps = (state) => {
  return {
      favoritesProduct: state.favoritesProduct ,
      cartProducts: state.cartProducts

  }
}
export default connect(mapStateToProps)(DetailsScreen)