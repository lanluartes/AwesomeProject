import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native'
import { Fonts } from './src/utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome'

class Survey extends React.Component{

    constructor(){
        super()
        this.state={
            data:['0 days','1-2 days','3-4 days','5-6 days','7 days'],
            checked: 0
        }
    }

    static navigationOptions = {
        header: null
      };

    render(){
        return(
            <View style={styles.container}>
            
                {/*where the header starts*/}
                <View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            Outdoor Activities
                        </Text>
                    </View>

                    <View style={styles.headerContainer}>
                        <View style={styles.remainingContainer}>
                            <Text style={styles.remainingText}>
                                1 of 4
                            </Text>
                        </View>

                        <View style={styles.nextButtonContainer}>
                            <Text style={styles.nextText}>
                                next
                            </Text>
                        </View>
                    </View>
                </View>


                {/*where the body starts*/}
                <View style={styles.surveyContainer}>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            How many days did you went outside barefooted?
                        </Text>
                    </View>

                    <View style={styles.choicesContainer}>
                        {this.state.data.map((data, key) => {
                            return(
                                <View key={key} style={styles.choicesContainer}>
                                    {
                                        this.state.checked==key?
                                        <TouchableWithoutFeedback>
                                            <View style={styles.choiceHighlight}>
                                                    <Icon 
                                                        style={styles.iconContainer}
                                                        name={'check'}
                                                        color={'white'}
                                                        size={30}
                                                        />   
                                                        <Text style={[styles.choiceText, {marginLeft: 0}]}>{data}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        :
                                        <TouchableWithoutFeedback onPress={()=>{this.setState({checked:key})}}>
                                            <View style={styles.choiceButton}>
                                                      <Text style={styles.choiceText}>{data}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    }
                                </View>
                            );
                        })}

                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFAFA'
    },

    categoryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3ffbd'
    },

    categoryText: {
        textAlign: 'center',
        fontFamily: Fonts.MontBlack,
        fontSize: 25,
        padding: 10,
        color: 'black'
    },
            
    headerContainer: {
        flexDirection: 'row'
    },

    remainingContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b2dbbf'
    },

    remainingText: {
        textAlign: 'center',
        fontFamily: Fonts.MontMed,
        fontSize: 20,
        padding: 18,
        color: 'black'
    },
    
    nextButtonContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#70c1b3'
    },

    nextText: {
        textAlign: 'center',
        fontFamily: Fonts.Quicksand,
        fontSize: 20,
        padding: 18,
        color: 'black'
    },

    surveyContainer: {
        flex: 1
    },

    questionContainer: {
        flex: 0.3,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },

    questionText: {
        textAlign: 'center',
        fontFamily: Fonts.MontMed,
        fontSize: 18,
        color: 'black',
        padding: 10
    },

    choicesContainer: {
        flex: 0.7
    },

    choiceButton: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#70c1b2',
        flexDirection: 'row',
        alignItems: 'center'
    },

    choiceHighlight: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#247ca2',
        flexDirection: 'row',
        alignItems: 'center'
    },

    choiceText: {
        textAlign:'left',
        color: '#F5F5F5',
        fontFamily: Fonts.MontMed,
        fontSize: 18,
        marginLeft:75,
        color: 'black'
    },

    iconContainer: {
        padding: 20
    }
})

export default Survey