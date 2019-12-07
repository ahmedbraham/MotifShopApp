// Store/Reducers/favoriteReducer.js
import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import toggleCart from './cartReducer'
const initialState = { favoritesProduct: [] , cartProducts: [] }
function toggleFavorite(state = initialState, action) {


  let nextState
  switch (action.type) {

     //-------------------------------------------------------------------------------
    case 'TOGGLE_FAVORITE':
      const favoriteCartIndex = state.favoritesProduct.findIndex(item => item.id === action.value.id)  //action.value ici === product
      if (favoriteCartIndex !== -1) {
        // Le produit est déjà dans les produits favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesProduct: state.favoritesProduct.filter((item, index) => index !== favoriteCartIndex)
        }
      }
 
      else {
        // Le produit n'est pas dans les produits favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesProduct: [...state.favoritesProduct, action.value]
        }
      }
      return nextState || state  
      
      //-------------------------------------------------------------------------------
      case 'TOGGLE_CART':
        const cartIndex = state.cartProducts.findIndex(item => item.id === action.value.id) //action.value ici === product
        if (cartIndex !== -1) {
            // Le produit est déjà dans le chariot, on le supprime de la liste
            nextState = {
                ...state,
                cartProducts: state.cartProducts.filter((item, index) => index !== cartIndex)
            }
        }
        else {
            // Le produit n'est pas dans le chariot  , on l'ajoute à la liste
            nextState = {
                ...state,
                cartProducts: [...state.cartProducts, action.value]
            }
        }
        return nextState || state
     


    default:
      return state




  }



/*

  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteCartIndex = state.favoritesProduct.findIndex(item => item.id === action.value.id)  //action.value ici === product
      if (favoriteCartIndex !== -1) {
        // Le produit est déjà dans les produits favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesProduct: state.favoritesProduct.filter((item, index) => index !== favoriteCartIndex)
        }
      }
      else {
        // Le produit n'est pas dans les produits favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesProduct: [...state.favoritesProduct, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }

*/





}
export default toggleFavorite