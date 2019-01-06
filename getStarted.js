import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Fonts } from './src/utils/Fonts';

class getStarted extends React.Component{

    static navigationOptions = {
        header: null
      };
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Before everything, we want you to fill out this things.
                    </Text>
                </View>

                <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryText}>
                        Outdoor Activities
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    headerText: {
        fontFamily: Fonts.Quicksand,
        fontSize: 19,
        color: 'black',
        padding: 20,
        textAlign: 'center'

    },

    headerContainer: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue'
    },

    categoryText: {
        fontFamily: Fonts.QuicksandBold,
        fontSize:20,
        paddingLeft: 20,
        color: 'black'
    },

    categoryTextContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderStyle: 'solid'
    },


    container: {
        flex: 1
    }
})

export default getStarted
