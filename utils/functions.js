import AsyncStorage from '@react-native-community/async-storage';
isConnected = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken != null) {
        return true
    } else {
        return false
    }
}
export { isConnected }  