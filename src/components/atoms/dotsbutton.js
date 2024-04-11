import React from 'react'
import { View, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';


const dotsbutton = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
  )
}

export default dotsbutton
