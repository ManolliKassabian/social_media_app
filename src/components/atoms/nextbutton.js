import React from 'react'
import { View, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';


const nextbutton = ({...props}) => {
  return (
    <TouchableOpacity
    style={{marginHorizontal:10}}
    {...props}
>
    <Text style={{fontSize:16}}>Next</Text>
</TouchableOpacity>
   
  )
}

export default nextbutton
