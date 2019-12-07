import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import backIcon from '../images/back.png'
class Header extends React.Component {
  render() {
    // const film = this.props.film
    const { title, goBack } = this.props
    return (
      <View style={styles.tabBar} >
        <Text style={styles.tabBarTitle} >{title}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', start: 0, padding: 20, paddingEnd: 40 }}
          onPress={() => goBack()}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
            source={backIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tabBar: {
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
})
export default Header