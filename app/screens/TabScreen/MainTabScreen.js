/**
 * Main Tab Screen
 */
import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IMG_CONST from '../../theme/ImageConstants';
import ColorConstants from '../../theme/ColorConstants';
import styles from './MainTabScreenStyle';

//*> Screens
import RestaurantHome from '../RestaurantHome/RestaurantHome';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';
import RestaurantCart from '../RestaurantCart/RestaurantCart';
import RestaurantCalculator from '../RestaurantCalculator/RestaurantCalculator';
import CreateMenuCalculatorScreen from '../MenuCalculator/CreateMenuScreen';
import HomeSupplierScreen from '../RestaurantHome/HomeSupplierScreen';

//*> Stacks
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const CartStack = createStackNavigator();
const CalculatorStack = createStackNavigator();

//*> Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabScreen = (props) => (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={() => <HomeStackScreen {...props} />}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={() => <SearchStackScreen {...props} />}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({ color }) => {
              return <Icon name="ios-notifications" color={color} size={26} />
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={() => <CartStackScreen {...props} />}
          options={{
            tabBarLabel: 'Cart',
            tabBarColor: '#694fad',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={() => <CalculatorStackScreen {...props} />}
          options={{
            tabBarLabel: 'Calculator',
            tabBarColor: '#d02860',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-aperture" color={color} size={26} />
            ),
          }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const renderBottomTabIcons = (iconIndex, isFocused) => {
    switch (iconIndex) {
      case 0:
        return <Image source={isFocused ? IMG_CONST.HOME_ENABLE_ICON : IMG_CONST.HOME_DISABLE_ICON} style={styles.homeIcons} />
      case 1:
        return <Image source={isFocused ? IMG_CONST.SEARCH_ENABLE_ICON : IMG_CONST.SEARCH_DISABLE_ICON} style={styles.searchIcons} />
      case 2:
        return <Image source={isFocused ? IMG_CONST.CART_ENABLE_ICON : IMG_CONST.CART_DISABLE_ICON} style={styles.cartIcons} />
      case 3:
        return <Image source={isFocused ? IMG_CONST.CALCULATOR_ENABLE_ICON : IMG_CONST.CALCULATOR_DISABLE_ICON} style={styles.calculatorIcons} />
      default:
        break;
    }
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  console.log('@@@ state =======', state, descriptors)
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
      <SafeAreaView style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.outerContainer}
            >
              <View style={[styles.tabContainer, { backgroundColor: isFocused ? ColorConstants.tabsBgColor : 'transparent' }]}>
                  {renderBottomTabIcons(index, isFocused)}
                  {!isFocused && <Text style={styles.labelStyle}>{label}</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
  );
}

const HomeStackScreen = (props) => (
    <HomeStack.Navigator>
        <HomeStack.Screen 
            name="RestaurantHome" 
            component={RestaurantHome} 
            options={({route, navigation}) => ({
                headerTitleAlign: 'center',
                headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
                route: {route}, 
                navigation: {navigation}})
            }
            initialParams={{handleMenu: () => props.handleMenu()}}
        />
        <HomeStack.Screen 
            name="HomeSupplier" 
            component={HomeSupplierScreen} 
            options={({route, navigation}) => ({
                headerTitleAlign: 'center',
                headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
                route: {route}, 
                navigation: {navigation}})
            }
            initialParams={{handleMenu: () => props.handleMenu()}}
        />
    </HomeStack.Navigator>
);

const SearchStackScreen = (props) => (
    <SearchStack.Navigator>
        <SearchStack.Screen 
          name="RestaurantSearch" 
          component={RestaurantSearch} 
          options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              route: {route}, 
              navigation: {navigation}})
          }
          initialParams={{handleMenu: () => props.handleMenu()}}
        />
    </SearchStack.Navigator>
);

const CartStackScreen = (props) => (
    <CartStack.Navigator>
        <CartStack.Screen 
            name="RestaurantCart" 
            component={RestaurantCart} 
            options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              route: {route}, 
              navigation: {navigation}})
            }
            initialParams={{handleMenu: () => props.handleMenu()}}
        />
    </CartStack.Navigator>
);

const CalculatorStackScreen = (props) => (
    <CalculatorStack.Navigator>
        <CalculatorStack.Screen 
          name="RestaurantCalculator" 
          component={RestaurantCalculator} 
          options={({route, navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
            route: {route}, 
            navigation: {navigation}})
          }
          initialParams={{handleMenu: () => props.handleMenu()}}
        />
        <CalculatorStack.Screen 
          name="CreateMenuCalculator"  
          component={CreateMenuCalculatorScreen} 
          options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              route: {route}, 
              navigation: {navigation}})
          }
          initialParams={{handleMenu: () => props.handleMenu()}}
        />
    </CalculatorStack.Navigator>
);
