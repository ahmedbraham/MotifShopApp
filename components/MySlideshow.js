import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import TimedSlideshow from '../utils/react-native-timed-slideshow/src';
import slideShowItems from '../utils/slideShowItems'
import backIcon from '../images/back.png'
import { withNavigation } from 'react-navigation';
class MySlideshow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // const film = this.props.film
    // const { title, goBack } = this.props
    return (
      <View style={styles.slide}>
        <TimedSlideshow
          progressBarColor='#009CDD'
          loop={true}
          items={slideShowItems}
          footerStyle={{ height: 10, backgroundColor: 'transparent' }}
          showProgressBar={false}
        />
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: 200,
  }
})
export default withNavigation(MySlideshow);
