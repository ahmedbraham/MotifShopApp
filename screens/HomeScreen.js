import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
//import TimedSlideshow from 'react-native-timed-slideshow';
import TimedSlideshow from '../utils/react-native-timed-slideshow/src';
import ProductItemLinearLayout from '../components/ProductItemLinearLayout'
import ProductItemGridLayout from '../components/ProductItemGridLayout'
import drawerIcon from '../images/drawerIcon.png'
import NetInfo from "@react-native-community/netinfo";
import no_wifi from '../images/no-wifi.png';
import { WebView } from 'react-native-webview';
import slideShowItems from '../utils/slideShowItems'
import { getProductsListFromApi, getProductsListFromApiWithPagination, getImageFromApi, signIn } from '../API/api'
import MySlideshow from '../components/MySlideshow'
import { connect } from 'react-redux'
import 'react-native-gesture-handler'

const MyComponent = React.memo(function MyComponent(props) {
  console.log(props)
  /* render using props */
  return (
    <Text>hellooo </Text>
  )
});
/*
function Header(props) {
  console.log('MyHeader')
  const { openMyDrawer } = props
  return (
    <View style={styles.tabBar} >
      <Text style={styles.tabBarTitle} >Home</Text>
      <TouchableOpacity
        style={{ position: 'absolute', start: 0, padding: 20, paddingEnd: 30 }}
        onPress={() => openMyDrawer()}
      // onPress={() =>this.props.navigation.navigate('DetailsScreen')}
      >
        <Image
          style={{ height: 20, width: 20, resizeMode: 'contain' }}
          source={drawerIcon}
        />
      </TouchableOpacity>
    </View>
  )
}
function areEqual(prevProps, nextProps) {
  if (
    prevProps.openMyDrawer === nextProps.openMyDrawer
  ) {
    return false;
  } else {
    return true;
  }
}
MyHeader = React.memo(Header, areEqual);
*/
//--------------------------------------HomeScreen-----------------------------------------------------
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0
    this.totalPages = 0
    this.state = {
      products: [],
      isLinearLayout: true,
      isLoading: true,
      isLoadingForFlatList: false,
      isConnected: false,
    };
  }
  _loadProduct() {
    this.setState({ isLoadingForFlatList: true })
    getProductsListFromApiWithPagination(this.page + 1).then(data => {
      this.page = this.page + 1
      // this.totalPages = data.total_pages
      this.setState({
        products: [...this.state.products, ...data.data],
        isLoading: false,
        isLoadingForFlatList: false
      })
      console.log('number of products is :', this.state.products.length)
    })
  }
  _storeItem = async (key, item) => {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------
  render() {
     return (
      <View style={styles.container}>
        {/*  
         <MyComponent></MyComponent>   
         <MyHeader  openMyDrawer={() => this.props.navigation.openDrawer()}  ></MyHeader>  
          */}
        <ScrollView bounces='false'
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
       
          <HeaderComponent openMyDrawer={() => this.props.navigation.openDrawer()} />
          <MySlideshow />
          {this._renderScreenTitle()}
          {this._renderShooseLayoutStyleButtons()}
          {this._renderProductsFlatList()}
           {this._displayLoading()}
          {this._displayLoadingForFlatList()}
        </ScrollView>
        {this._renderConnexionStateView()}
      </View>
    );
  }
  //--------------------------------------------------------------------------------------------------------------------------
  _renderConnexionStateView = () => {
    if (!this.state.isConnected) {
      return (
        <View style={{
          height: 50, width: '100%', backgroundColor: 'rgba(209, 0, 0, 0.7)', position: 'absolute', bottom: 0, justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center'
          }} >
            <Image
              style={{ height: 30, width: 30, resizeMode: 'contain', marginEnd: 10 }}
              source={no_wifi}
            />
            <Text style={{ color: '#fff' }} >
              CHECK YOUR INTERNET CONNECTION !!
            </Text>
          </View>
        </View>
      )
    } else if (!this.state.products.length > 0) {
      //   this._getProductsListFromApi()
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={{ position: 'absolute', top: 340, zIndex: 10, alignSelf: 'center' }}>
          <ActivityIndicator size='large' color='#009CDD' />
        </View>
      )
    }
  }
  _displayLoadingForFlatList() {
    if (this.state.isLoadingForFlatList) {
      return (
        <View style={{ position: 'absolute', bottom: 0, zIndex: 10, alignSelf: 'center' }}>
          <ActivityIndicator size='large' color='#009CDD' />
        </View>
      )
    }
  }
  _renderHeader() {
    return (
      <HeaderComponent openMyDrawer={() => this.props.navigation.openDrawer()} />
    );
  }
  _renderScreenTitle() {
    return (
      <PopularProductsComponent />
    );
  }// End renderScreenTitle()
  _renderShooseLayoutStyleButtons() {
    if (this.state.isLinearLayout) {
      return (
        <View style={{ height: 50, flexDirection: "row", marginEnd: 10 }}>
          <TouchableOpacity
            disabled={!this.state.isConnected}
            style={{ position: 'absolute', end: 0, paddingStart: 10, paddingBottom: 10, paddingTop: 10 }}
            onPress={() => { this.page = 0, this.setState({ isLinearLayout: true, isLoading: true, products: [] }, () => { this._loadProduct() }) }}
          >
            <Image
              source={require('../images/linearLayoutIcon.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.state.isConnected}
            style={{ position: 'absolute', end: 40, paddingStart: 10, paddingBottom: 10, paddingTop: 10 }}
            onPress={() => { this.page = 0, this.setState({ isLinearLayout: false, isLoading: true, products: [] }, () => { this._loadProduct() }) }}
          >
            <Image
              source={require('../images/gridLayoutIcon.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ height: 50, flexDirection: "row", marginEnd: 10 }}>
          <TouchableOpacity
            disabled={!this.state.isConnected}
            style={{ position: 'absolute', end: 0, paddingStart: 10, paddingBottom: 10, paddingTop: 10 }}
            onPress={() => { this.page = 0, this.setState({ isLinearLayout: true, isLoading: true, products: [] }, () => { this._loadProduct() }), {/*  this._getProductsListFromApi()  */ } }}
          >
            <Image
              source={require('../images/linearLayoutNotSelected.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.state.isConnected}
            style={{ position: 'absolute', end: 40, paddingStart: 10, paddingBottom: 10, paddingTop: 10 }}
            onPress={() => { this.page = 0, this.setState({ isLinearLayout: false, isLoading: true, products: [] }, () => { this._loadProduct() }), {/*  this._getProductsListFromApi()  */ } }}
          >
            <Image
              source={require('../images/gridLayoutSelectedIcon.png')}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );
    }
  }// End renderShooseLayoutStyleButtons()
  _renderProductsFlatList() {
    const { products } = this.state
    const { isLoading } = this.state
    if (this.state.isLinearLayout) {
      return (
        <FlatList nestedScrollEnabled={true}
          style={{ height: 600 }}
          horizontal={false}
          numColumns={this.state.isLinearLayout ? 1 : 2}
          data={products}
          key={(this.state.isLinearLayout) ? 1 : 0}
          keyExtractor={(item) => item.id.toString()}
          extraData={false}
          renderItem={({ item }) => <ProductItemLinearLayout navigation={this.props.navigation} product={item} displayDetailForProduct={this._displayDetailForProduct}
          isProductFavorite={(this.props.favoritesProduct.findIndex(product => product.id === item.id) !== -1) ? true : false} 
          isProductInCart={(this.props.cartProducts.findIndex(product => product.id === item.id) !== -1) ? true : false} 

            />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('onEndReached')
            this._loadProduct()
          }}
        />
      );
    } else {
      return (
        <FlatList
          nestedScrollEnabled={true}
          style={{ height: 600 }}
          contentContainerStyle={{ margin: 0 }}
          horizontal={false}
          numColumns={this.state.isLinearLayout ? 1 : 2}
          data={products}
          key={(this.state.isLinearLayout) ? 1 : 0}
          keyExtractor={(item) => item.id.toString()}
          extraData={false}
          renderItem={({ item }) => <ProductItemGridLayout product={item} displayDetailForProduct={this._displayDetailForProduct}
            isProductFavorite={(this.props.favoritesProduct.findIndex(product => product.id === item.id) !== -1) ? true : false}
            isProductInCart={(this.props.cartProducts.findIndex(product => product.id === item.id) !== -1) ? true : false} 
          />}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            console.log('onEndReached')
            this._loadProduct()
          }}
        />
      );
    }
  }// End renderProductsFlatList()
  _displayDetailForProduct = (id, title, image, price, averageRating , description ) => {
    // console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("DetailsScreen", { idProduct: id, titleProduct: title, imageProduct: image, priceProduct: price, AverageRatingProduct: averageRating  , description:description})
  }
  _getProductsListFromApi = () => {
    if (this.state.isConnected) {
      getProductsListFromApi().then(data => {
        this.setState({
          products: data.data,
          isLoading: false
        })
      })
    }
  }
  componentDidMount() {
    console.log('my Props are : ' ,this.props) 
    console.log('my state' , this.state)
 
    // this._checkConnexion() 
    unsubscribe = NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      this.setState({ isConnected: state.isConnected })
      this._loadProduct()
    });  
    //  this._getProductsListFromApi()
    this._storeItem('myCart',
      {
        products: [
          { id: 1, title: 'product_1', qte: 36 },
          { id: 2, title: 'product_2', qte: 45 },
          { id: 3, title: 'product_3', qte: 66 },
          { id: 4, title: 'product_4', qte: 44 },
          { id: 5, title: 'product_5', qte: 92 }
        ],
        user: {
          firstName: 'ahmed',
          lastName: 'braham',
          ville: 'sousse'
        }
      })
  }
  /* componentWillMount() {
     // Subscribe
     unsubscribe = NetInfo.addEventListener(state => {
       //console.log("Connection type", state.type);
       //console.log("Is connected?", state.isConnected);
       this.setState({ isConnected: state.isConnected })
     });
     this._getProductsListFromApi()
   } 
   */
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  componentDidUpdate() {
    // this._getProductsListFromApi()          
  }
 
}// End class HomeScreen
HomeScreen.navigationOptions = {
  header: null,
};
//--------------------------------------popularProductsComponent-----------------------------------------------------
export class PopularProductsComponent extends React.Component {
  render() {
    console.log('render PopularProductsComponent')
    return (
      <View style={{}} >
        <View style={{ backgroundColor: '#C3C3C3', width: 80, height: 2, alignSelf: 'center', marginTop: 15 }}></View>
        <View style={styles.popularProductsContainer}>
          <Text style={styles.popularProductsText}>OUR POPULAR PRODUCTS</Text>
        </View>
        <View style={{ backgroundColor: '#C3C3C3', width: 80, height: 2, alignSelf: 'center', marginTop: 10, marginBottom: 15 }}></View>
        <View  ></View>
      </View>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
} // End PopularProductsComponent
//--------------------------------------headerComponent-----------------------------------------------------
export class HeaderComponent extends React.Component {
  render() {  
    const { openMyDrawer } = this.props
    return (
      <View style={styles.tabBar} >
        <Text style={styles.tabBarTitle} >Home</Text>
        <TouchableOpacity 
          style={{ position: 'absolute', start: 0, padding: 20, paddingEnd: 30 }}
          onPress={() => openMyDrawer()}   
        // onPress={() =>this.props.navigation.navigate('DetailsScreen')}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
            source={drawerIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.openMyDrawer === nextProps.openMyDrawer
    ) {
      return true;
    } else {
      return false;
    }
  }
} // End PopularProductsComponent
//------------------------------------StyleSheet--------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  contentContainer: {
    paddingTop: 0,
  },
  slide: {
    width: '100%',
    height: 200,
  },
  popularProductsContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 10,
  },
  popularProductsText: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: '#434445'
  }, tabBar: {
    flex: 1,
    flexDirection: 'row',
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
const mapStateToProps = state => {
  return {
    favoritesProduct: state.favoritesProduct ,
    cartProducts: state.cartProducts

  }
}
export default connect(mapStateToProps)(HomeScreen)