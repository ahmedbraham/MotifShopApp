import React from 'react';
import {  Text} from 'react-native';


function MyComponent(props) {
    return (
        <Text>hellooo</Text>
    )
  }
  function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  }
  export default React.memo(MyComponent, areEqual);