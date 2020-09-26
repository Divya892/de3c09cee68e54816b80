/**
 * Home Screen
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
import styles from './HomeScreenStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countryData: null,
        }
    }

    onPressSubmitButton = async() => {
        try {
            let response = await fetch(
              `https://restcountries.eu/rest/v2/name/${this.state.country}`
            );
            let json = await response.json();
            this.setState({ countryData: json }, () => {
                if(json.status === 404) {
                    alert(json.message);
                    return;
                }

                this.props.navigation.navigate('CountryListScreen', { countryList: this.state.countryData })
            })
            console.log('@@@ JSON ============', json);
          } catch (error) {
            console.log('@@@ Error ============', error);
          }
    }
    
    renderInputForm = () => {
        return (
            <View style={styles.inputFormHeader}>
                <Text style={styles.formText}>Search Country</Text>
                <TextInput {...this.props}
                    style={styles.inputStyle}
                    placeholder={'Enter Country'}
                    value={this.state.country}
                    onChangeText={(value) => this.setState({ country: value })}
                    autoCapitalize={false}
                />
                <TouchableOpacity disabled={this.state.country.trim().length === 0} onPress={() => this.onPressSubmitButton()} style={[styles.submitButton, { backgroundColor: this.state.country.trim().length === 0 ? 'grey' : 'green'}]}>
                    <Text style={[styles.submitText, { color: this.state.country.trim().length === 0 ? '#000000' : '#ffffff'}]}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLOR_CONST.white }]}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        {this.renderInputForm()}
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
};

export default SignInScreen;

