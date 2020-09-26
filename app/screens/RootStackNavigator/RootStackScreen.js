/**
 * Root Stack Screen
 */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../Splash/SplashScreen';
import HomeScreen from '../Home/HomeScreen';
import CountryListScreen from '../CountryList/CountryList';
import CountryDetailScreen from '../CountryDetail/CountryDetail';


const RootStack = createStackNavigator();
const NewStack = createStackNavigator();

const RootStackScreen = (props) => {
    return (
        <RootStack.Navigator>                        
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen 
                options={({ route, navigation }) => ({
                    title: 'Home',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
                    route: { route },
                    navigation: { navigation }
                })
                } 
                name="HomeScreen" 
                component={HomeScreen}
            />
            <RootStack.Screen 
                options={({ route, navigation }) => ({
                    title: 'Country List',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
                    route: { route },
                    navigation: { navigation }
                })
                } 
                name="CountryListScreen" 
                component={CountryListScreen}
            />
            <RootStack.Screen 
                options={({ route, navigation }) => ({
                    title: 'Country Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
                    route: { route },
                    navigation: { navigation }
                })
                } 
                name="CountryDetailScreen" 
                component={CountryDetailScreen}
            />
        </RootStack.Navigator>
    );
};

export default RootStackScreen;