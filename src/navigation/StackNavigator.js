import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import FeedScreen from '../screens/FeedScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import NewFeedScreen from '../screens/NewFeedScreen';
const Stack = createStackNavigator()

/**
 * Intialize here all screen
 * 
 * @returns StackNavigator
 */
function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Feed' component={FeedScreen} />
        <Stack.Screen name='NewFeed' component={NewFeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator