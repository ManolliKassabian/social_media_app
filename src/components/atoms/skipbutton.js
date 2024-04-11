import React from 'react'
import { View, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';


const skipbutton = ({...props}) => {
  return (
    <TouchableOpacity
    style={{marginHorizontal:10}}
    {...props}
>
    <Text style={{fontSize:16}}>Skip</Text>
</TouchableOpacity>
  )
}

export default skipbutton
