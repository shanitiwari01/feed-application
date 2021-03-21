import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';

/**
 * Store user details
 */
global.userDetails = {};


export default class App extends React.Component {
  render() {
    return (
      // intialize navigation
      <StackNavigator />
    )
  }
}
