// index.js
import { combineReducers } from 'redux';
import toggleFavorite from './favoriteReducer'
import toggleCart from './cartReducer'
export default combineReducers({
    favorite: toggleFavorite,
    cart: toggleCart
});
