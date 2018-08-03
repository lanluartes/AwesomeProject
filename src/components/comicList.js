import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, Image, TouchableWithoutFeedback,TouchableHighlight, Dimensions, ScrollView} from 'react-native'
import { Fonts } from '../utils/Fonts';
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import ComicDetails from './comicDetails'

const {width, height} =  Dimensions.get('screen')


class ComicList extends Component{
    
    //storage for API data
    constructor() {
        super();
        this.state = {comicData: []}
        this.state = {currentComicData: []}
      }

    
    //to initialize data from API
    componentDidMount(){
        this.getData()
    }  

    //to identify unique object
    _newPushContent = item => {
        this.setModalVisible(true)
        this.setState({currentComicData: item});
    }

    //state of modal
    state = {
        modalVisible: false,
      };

    
    //state handled of modal
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //to get api data 
    async getData() {
        try {
          let response = await fetch(
            'http://10.0.2.2/sampl2/public/api/comics'
          );

          let responseJson = await response.json();
          this.setState({ comicData: responseJson});
        } catch (error) {
          console.error(error);
        }
      }

    //to enlist the collection of API objects
    _showList = data => {
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(data)}>
                <Image style={{width: 120, height: 180, borderRadius: 20}} source={{uri: 'http://10.0.2.2/sampl2/'+data.ComicPath}}/>
            </TouchableWithoutFeedback>
        )
    }

    render(){
        console.log(this.state.currentComicData.ComicPath)
        return(
        <View>
                <Text style={styles.listTitle}>My Comics</Text>
                <FlatList 
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                      renderItem={({item}) => this._showList(item)} 
                      data={this.state.comicData}
                 />


                {/* this is the modal */}
                 <Animatable.View animation="bounce" style={{borderRadius: 10}}>
                    <Modal
                    backdropColor='black'
                    animationType="slide"
                    isVisible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                    onBackdropPress={() => {this.setModalVisible(false)}}
                    style={{margin: 22, marginBottom:22,  borderRadius: 20, backgroundColor: '#636e72'}}
                    >
                    <ScrollView>
                    <Animatable.View animation="bounceInUp"  style={{flex: 1, margin: 20}}>

                        <View>
                            <Text style={styles.titleShow}>
                                {this.state.currentComicData.ComicAuthor}
                            </Text>
                            <Image
                                source={{uri: 'http://10.0.2.2/sampl2/'+this.state.currentComicData.ComicPath}}
                                style={{width: 120, height: 180, borderRadius: 20}}
                            />
                                
                        <TouchableWithoutFeedback
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <View>
                            <Text style={styles.text}>Hide Modal</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>

                    </Animatable.View>
                    </ScrollView>
                    </Modal>
                </Animatable.View> 

        </View>
        )
    }

}

const styles = StyleSheet.create({

    listTitle: {
             fontSize: 20,
             fontFamily: Fonts.Quicksand,
             color: 'black'
    },

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg
    },

    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        color: '#F5FCFF',
        fontFamily: Fonts.Quicksand
    },

})

export default ComicList