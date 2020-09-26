/**
 * Country List Screen
 */
import React , { Component } from 'react';
import { 
    View, 
    Image,
    Text,
    SafeAreaView,
    TextInput,
    FlatList,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLOR_CONST from '../../../app/theme/ColorConstants';
import styles from './CountryListStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryList: this.props.route.params.countryList
        }
    }

    componentDidMount() {
        console.log('@@@ Navigation =========', this.props.route)
    }

    onPressCountry = (item) => {
        this.props.navigation.navigate('CountryDetailScreen', { countryDetail: item })
    }

    renderCountryCell = (item, index) => {
        return (
            <TouchableOpacity onPress={() => this.onPressCountry(item)} style={styles.countryListCell}>
                <View style={styles.leftView}>
                    <Text style={styles.fieldValue}>Name: {item.name}</Text>
                    <Text style={styles.fieldValue}>Capital: {item.capital}</Text>
                    <Text style={styles.fieldValue}>Population: {item.population}</Text>
                    <Text style={styles.fieldValue}>Lating: {item.latlng}</Text>
                </View>
                <SvgUri
                    width="10%"
                    height="20%"
                    uri={item.flag}
                />            
            </TouchableOpacity>
        )
    }
    
    renderCountryList = () => {
        return (
            <View style={styles.countryListContainer}>
                <FlatList
                        data={this.state.countryList}
                        renderItem={({item, index}) => this.renderCountryCell(item, index)}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                    />
            </View>
        )
    }
    
    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLOR_CONST.white }]}>
                <View style={styles.container}>
                    {this.renderCountryList()}
                </View>
            </SafeAreaView>
        );
    }
};

export default CountryList;

