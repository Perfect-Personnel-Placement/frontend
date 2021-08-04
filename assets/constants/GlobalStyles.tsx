import React from 'react'
import {StyleSheet} from 'react-native'
import colors from './colors'
const GlobalStyles = StyleSheet.create({

button:{
    backgroundColor:colors.primaryOrange,
    borderRadius:300,
    padding:5,
    color:colors.primaryWhite,
},
container:{
    flex:.75,
    justifyContent:"space-evenly",
}




})
export default GlobalStyles;