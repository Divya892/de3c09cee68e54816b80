import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
const { height, width } = Dimensions.get('window');


export default StyleSheet.create({

    container: {
        flex: 1,
    },

    inputFormHeader: {
        flex: 1,
        alignItems: 'center',
        marginTop: verticalScale(20),
    },

    submitButton: {
        marginTop: verticalScale(20),
        width: scale(200),
        height: scale(50),
        borderRadius: scale(25),
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitText: {
        fontSize: scale(20),
        fontWeight: 'bold',
    },

    formText: {
        fontSize: scale(25),
        fontWeight: 'bold',
    },

    fieldValue: {
        fontSize: scale(20),
        color: 'grey',
        fontWeight: 'bold',
        marginLeft: scale(20),
        marginTop: verticalScale(10),
    },

    flag: {
        width: scale(200),
        height: scale(200),
        marginTop: verticalScale(10),
    },

    weatherData: {
        marginTop: verticalScale(20),
        alignItems: 'center'
    },

    imageIcon: {
        marginTop: verticalScale(10),
        width: scale(50),
        height: scale(50),
    }
    
});
