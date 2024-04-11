import React from 'react'
import { StyleSheet, View ,Image,TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import skipbutton from '../components/atoms/skipbutton';
import nextbutton from '../components/atoms/nextbutton';
import donebutton from '../components/atoms/donebutton';
import dotsbutton from '../components/atoms/dotsbutton';


const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
    SkipButtonComponent={skipbutton}
    NextButtonComponent={nextbutton}
    DoneButtonComponent={donebutton}
    DotComponent={dotsbutton}

    onSkip={() => navigation.navigate("Login")}
    onDone={() => navigation.navigate("Login")}

    pages={[
      {
        backgroundColor: '#a6e4d0',
        image: <Image source={require('../assets/onboarding-img1.png')} />,
        title: 'Connect to the World',
        subtitle: 'A New Way To Connect To The World',
      },

      {
        backgroundColor: '#fdeb93',
        image: <Image source={require('../assets/onboarding-img2.png')} />,
        title: 'Share Your Favorites',
        subtitle: 'Share Your thoughts With Similar Kind of People',
      },

      {
        backgroundColor: '#e9bcbe',
        image: <Image source={require('../assets/onboarding-img3.png')} />,
        title: 'Become The Star',
        subtitle: 'Let The Spot Light Capture You',
      },
      
    ]}
  />
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'

    }
})
