import React, { Component } from 'React';
import {Alert, View, Text, StyleSheet, Image, TouchableOpacity, Button, AppState} from 'react-native';
import { Fonts } from './src/utils/Fonts';
import {createBottomTabNavigator} from 'react-navigation';
import Swiper from 'react-native-swiper';
import PushNotification from 'react-native-push-notification';
import  PushController from './PushController';


import Kwentuhan from './KwentuhanTayo';

export default class Home extends React.Component{




    constructor(props){
        super(props);
    
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
          seconds: 5,
        }
      }
    
      componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);
      }
    
      componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
      }
    
      handleAppStateChange(appState) {
          if(appState === 'background'){
            let date = new Date(Date.now() + (this.state.seconds * 5));
            
            PushNotification.localNotificationSchedule({
              message: "Wash Hands now, and get free WASH points.",
              date,
            });
          }
      }


    static navigationOptions = {
        headerRight: <Text style={[{fontSize: 20, marginRight: 20, fontFamily: Fonts.Quicksand, color: 'black'}]}> Wash App Kids </Text>,
        headerLeft:
               <View style={{ 
                   alignContent: 'flex-start',
                   flexDirection: 'row',
                   flexWrap: 'nowrap'}}> 
                   <Image 
                      style={{width: 25,
                       height: 25,
                       marginLeft: 8,
                       marginTop: 10}}
                      source={require('./assets/Images/pupLogo.png')}/>
                   <Image 
                      style={{width: 25,
                       height: 25,
                       marginLeft: 8,
                       marginTop: 10}}
                      source={require('./assets/Images/ched.png')}/>
                    <Image 
                      style={{width: 25,
                       height: 25,
                       marginLeft: 8,
                       marginTop: 10}}
                      source={require('./assets/Images/K12Logo.png')}/>
                     <Image 
                      style={{width: 67,
                       height: 45,
                       marginLeft: 8}}
                      source={require('./assets/Images/dare-to.png')}/>
               </View> 
            
}


    render(){
        return(
            <View style={styles.holderBox}>

                <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Wash App Kids
                        </Text>
                </View>

                {/*this panel may be used to hold the -banner- an image or an array of image showing what's new in the app.*/}
                <View style={styles.imageBox}>
                    {/*learn how to install react-native-slider -- tutorial: www.youtube.com/results?search_query=how+to+install+react-native+swiper --*/}
                    <Swiper style={styles.wrapper}>
                        <View style={styles.slide}>
                             <Image style={{flex: 1, resizeMode: 'contain'}} 
                                    source={require('./assets/Images/1.jpg')}/>
                        </View>

                        <View style={styles.slide}>
                            <Image style={{flex: 1, resizeMode: 'contain'}} 
                                   source={require('./assets/Images/2.jpg')}/>
                        </View>

                        <View style={styles.slide}>
                            <Image style={{flex: 1, resizeMode: 'contain'}} 
                                   source={require('./assets/Images/3.jpg')}/>
                        </View>
                    </Swiper>
                </View>

                {/*this panel is used for holding the buttons that lead to other processes -stream video, read comics, play games-*/}
                <View style={styles.mainBox}>
                    <View style={styles.insideBox}>
           

                    </View>

                    <View style={styles.insideBox}>
              
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={this.onPress}>
                        <Image 
                        style={styles.buttonIcon}
                        source={require('./assets/Icons/sledge.png')}/>
                        <Text  style={styles.buttonText}>Tayo na't Maglaro</Text>
                        </TouchableOpacity> 
                    </View> 
                </View>

               <PushController />

            </View>

       
        );
    }
  }

 
  const styles = StyleSheet.create({
        
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
            backgroundColor: '#9DD6EB'
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