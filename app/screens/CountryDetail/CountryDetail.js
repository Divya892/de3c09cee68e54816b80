/**
 * Country Detail Screen
 */
import React , { Component } from 'react';
import { 
    View, 
    Image,
    Text,
    SafeAreaView,
    TextInput,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLOR_CONST from '../../../app/theme/ColorConstants';
import styles from './CountryDetailStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

class CountryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countryData: null,
            weatherData: null,
            showData: false,
        }
    }

    onPressCapitalWeather = async () => {
        const { name, capital, population, latlng, flag } = this.props.route.params.countryDetail;
        try {
            let response = await fetch(
              `http://api.weatherstack.com/current?access_key=fd41f5df7e35e68dc6722e8f274e343e&query=${capital}`
            );

            let json = await response.json();
            this.setState({ weatherData: json.current }, () => {
                this.setState({ showData: true });
            })
            console.log('@@@ Weather JSON ============', json);
          } catch (error) {
            console.log('@@@ Error ============', error);
          }
    }
    
    renderCountryDetail = () => {
        const { name, capital, population, latlng, flag } = this.props.route.params.countryDetail;
        return (
            <View style={styles.inputFormHeader}>
                <View>
                <Text style={styles.fieldValue}>Name: {name}</Text>
                <Text style={styles.fieldValue}>Capital: {capital}</Text>
                <Text style={styles.fieldValue}>Population: {population}</Text>
                <Text style={styles.fieldValue}>Lating: {latlng}</Text>
                </View>
                <View style={styles.flag}>
                    <SvgUri
                        width="100%"
                        height="100%"
                        uri={flag}
                    />  
                </View>
                <TouchableOpacity onPress={() => this.onPressCapitalWeather()} style={[styles.submitButton]}>
                    <Text style={[styles.submitText]}>Capital Weather</Text>
                </TouchableOpacity>           
            </View>
        )
    }

    renderWeatherData = () => {
        const { wind_speed, temperature, precip, weather_icons} = this.state.weatherData;
        return (
            <View style={styles.weatherData}>
                <Text style={styles.fieldValue}>Temperature: {temperature}</Text>
                <Image source={{ uri: weather_icons[0]}} style={styles.imageIcon} />
                <Text style={styles.fieldValue}>Wind SPEED: {wind_speed}</Text>
                <Text style={styles.fieldValue}>PRECIP: {precip}</Text>
            </View>
        )
    }
    
    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLOR_CONST.white }]}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Animatable.View useNativeDriver animation="slideInUp" delay={300} style={styles.header}>
                            {this.renderCountryDetail()}
                            {this.state.showData && this.renderWeatherData()}
                        </Animatable.View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
};

export default CountryDetail;

