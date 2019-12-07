// Store/configureStore.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import toggleFavorite from './Reducers/favoriteReducer'
import toggleCart from './Reducers/cartReducer'
//import rootReducer from './Reducers/favoriteReducer'
//import rootReducer from './Reducers/rootReducer'
// import rootReducer from './Reducers/index'
export const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const rootReducer = combineReducers({
    favoritesProduct : toggleFavorite,
    cartProducts : toggleCart
});


 const persistedReducer = persistReducer(persistConfig, toggleFavorite)
let store = createStore(persistedReducer)
  export let persistor = persistStore(store)
export default store



  // export default createStore(toggleFavorite)
        