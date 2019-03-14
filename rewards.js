import React, { Component } from 'React';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, ImageBackground, AppState, AsyncStorage} from 'react-native';
import { Fonts } from './src/utils/Fonts';

export default class rew extends React.Component{


    constructor(){
        super()

        this.state = {
            totalCount: 54,
            maxCount: 116,
            statements: [
                "Based on your survey, you are at a very low risk of inhibiting parasites. Good job!",
                "Your statistics are not that high, but it's still best to be careful and keep those hands CLEAN!",
                "You are prone to infestation of parasites, change that life style now!"
            ]
        }
    }

    componentWillMount = () => {
        // this.setState({totalCount: this.props.navigation.state.params.totalCount})
    }

    static navigationOptions = {
        header: null
        };

    eitherOr = () =>{
        let computation = ((this.state.totalCount / this.state.maxCount) * 100).toFixed(2)

        if(computation < 25){
            return this.state.statements[0]
        }else if(computation < 50){
            return this.state.statements[1]
        }else if(computation < 75){
            return this.state.statements[2]
        }else if(computation < 100){
            return this.state.statements[3]
        }
    }

    render(){
        return(
            <View style={styles.holderBox}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>
                        {'Your total score is'}
                    </Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>  
                    <Text style={styles.highlightText}>
                        {((this.state.totalCount / this.state.maxCount) * 100).toFixed(2) + '%'}
                    </Text>
                </View>

                <View style={{flex: 2, justifyContent: 'center'}}>  
                    <Text style={styles.sub}>
                        {
                            this.eitherOr()
                        }
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={()=> {this.props.navigation.navigate('Tab')}}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            {'Back to home'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
  }

 
  const styles = StyleSheet.create({
        categoryContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3ffbd'
        },

        highlightText:{
            textAlign: 'center',
            fontFamily: Fonts.MontBlack,
            fontSize: 100,
            padding: 10,
            color: 'black'
        },

        sub: {
            textAlign: 'center',
            fontFamily: Fonts.MontBlack,
            fontSize: 20,
            padding: 10,
            color: 'black'
        },

        categoryText: {
            textAlign: 'center',
            fontFamily: Fonts.MontBlack,
            fontSize: 25,
            padding: 10,
            color: 'black'
        },
            
        header:{
            flex: 0.4,
            backgroundColor: '#FFE066',
            justifyContent: 'center',
            alignContent: 'center'
        },

        headerText: {
            fontSize: 20,
             textAlign: 'center', 
             fontFamily: Fonts.Quicksand,
             color: '#00A6ED'
        },
            
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9DD6EB',
            borderRadius: 10,
            margin: 10
        },
        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
        },

        buttonText: {
            fontSize: 17,
             textAlign: 'center', 
             fontFamily: Fonts.Quicksand,
             color: 'black'
        },

        holderBox:{
                flex: 1,
                flexDirection: 'column'
            },

        creditBox:{
            flex: 0.5, 
            backgroundColor: 'powderblue',
            paddingTop: 28,
            alignContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'nowrap'
            },
        
        resizeImage:{
            width: 25,
            height: 25,
            marginLeft: 8,
            marginTop: 10
            },
            
        imageBox:{
                flex:2, 
                backgroundColor: '#F5FCFF'
            },
            
        mainBox:{

                flex:3, 
                backgroundColor: '#F5FCFF',
                flexDirection: 'column',
                flexWrap: 'wrap'

            },
        
        insideBox:{
                flex: 1.5,
                backgroundColor: '#F5FCFF',
                flexDirection: 'row',
                alignContent: 'flex-start',
                justifyContent: 'center'
        },

        buttonIcon: {
                width: 75,
                height: 75,
                padding: 10
             },

        button: {
                backgroundColor: '#3498db',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'nowrap',
                flex: 2,
                margin: 10,
                borderRadius: 10,

            }

    }
  )