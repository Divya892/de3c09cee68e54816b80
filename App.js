/**
 * Restaurant Supply React Native App
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import RootStackScreen from './app/screens/RootStackNavigator/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { Provider } from 'react-redux';
import configureStore from './app/redux/config/store/index';
import * as IMG_CONST from './app/theme/ImageConstants';
import { CommonStyles } from './app/theme/ApplicationStyles';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false,
      isLoading: true,
      isLoggedIn: false,
      isOnBoardingCompleted: false,
      store: configureStore(() => {
      }).store
    };
  }
  
  async componentDidMount () {
    let token = await AsyncStorage.getItem('IS_LOGGED_IN');
    let isOnBoardingCompleted = await AsyncStorage.getItem('IS_ON_BOARDING_COMPLETED');
    console.disableYellowBox = true;
    setTimeout(() => {
      if(token != null) {
        this.setState({ isLoggedIn: true });
      }
      if(isOnBoardingCompleted != null) {
        this.setState({ isOnBoardingCompleted: true });
      }
      this.setState({ isLoading: false });
    }, 1000);
  }

  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={CommonStyles.appContainer}>
          <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={IMG_CONST.APP_LOGO}
                style={CommonStyles.appLogo}
                resizeMode="stretch"
            />
          {/* <ActivityIndicator size="large" color="#ffffff"/> */}
        </View>
      );
    }
    return (
      <Provider store={this.state.store}>
          <NavigationContainer>
            <RootStackScreen isLoggedIn={this.state.isLoggedIn} isOnBoardingCompleted={this.state.isOnBoardingCompleted} toggleTheme={this.toggleTheme}/>
          </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
