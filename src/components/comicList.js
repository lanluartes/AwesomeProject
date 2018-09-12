import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, Image, TouchableWithoutFeedback,TouchableHighlight, Dimensions, ScrollView} from 'react-native'
import { Fonts } from '../utils/Fonts';
import Orientation from 'react-native-orientation'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChapterList from './ChapterList'

const {width, height} =  Dimensions.get('screen')


class ComicList extends Component{
    
    //storage for API data
    constructor() {
        super();
        this.state = {comicData: [], currentComicData: []}
      }

    
    //to initialize data from API
    componentDidMount(){
        this.getData()
    }  

    //to identify unique object
    _newPushContent = item => {
        this.setState({modalVisible: true, currentComicData: item})
    }

    //state of modal
    state = {
        modalVisible: false,
      };

    
    //state handler of modal
    setModalVisible = visibility => {
        this.setState({modalVisible: visibility});
    }

    //to get api data 
    async getData() {
        try {
          let response = await fetch(
            'http://10.0.2.2/wash-admin/public/api/comics'
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
                 <View style={{backgroundColor: '#1d3557', paddingBottom: 3}}>
                    <Image style={styles.imageResize} source={{uri: 'http://10.0.2.2/wash-admin/'+data.ComicThumbnailPath}}/>
                    <Text numberOfLines={1} style={styles.textForThumbnail} 
                    allowFontScaling adjustsFontSizeToFit 
                    minimumFontScale={.5}> {data.ComicTitle} </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render(){

        // console.log(this.props.navigation.state.params.passProps.userID)

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
                    style={styles.modalContainer}
                    >
                        <Animatable.View animation="bounceInUp"  style={{flex: 1, margin: 20, flexDirection: 'column'}}>

                            {/* Modal header */}
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View style={{flex: 3}}>
                             
                                    <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={[styles.titleShow]}>
                                        {this.state.currentComicData.ComicTitle}
                                    </Text>
                                    <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={styles.subtitleShow}>
                                       Author: 
                                       {this.state.currentComicData.ComicAuthor}
                                    </Text>
                                    <Text allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={[styles.subtitleShow, {fontSize: 14}]}>
                                       Description: {this.state.currentComicData.ComicDescription}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100}}>
                                        <TouchableWithoutFeedback
                                        onPress={() => console.log('hello world')}
                                    >
                                        <View style={styles.myListIcon}>
                                                <Icon 
                                                style={styles.listIcon}
                                                name={'heart-o'}
                                                color={'white'}
                                                size={25}
                                                />                         
                                        </View>
                                    </TouchableWithoutFeedback>  
                                </View>    
                             </View>

                            {/* CONTAINER FOR CHAPTER LIST */}
                            <View style={{flex: 4, borderColor: 'white', borderBottomWidth: 1, borderTopWidth: 1}}>
                           
                                    <ChapterList 
                                    closeModal={value => this.setModalVisible(value)}
                                    currentComicData = {this.state.currentComicData} 
                                    //modalState = {this.state.setModalVisible} 
                                    navigation={this.props.navigation}/>
                           
                            </View>

                               <View style={{alignSelf: 'center'}}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <View>
                                            <Ionicon name={'ios-arrow-down'} size={30} color={'#F5FCFF'}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                        </Animatable.View>
                    </Modal>
                </Animatable.View> 

        </View>
        )
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22,
        marginBottom:22, 
        borderRadius: 20, 
        backgroundColor: '#1d3557'
    },

    imageResize: {
        width: 120, 
        height: 180, 
        borderRadius: 2, 
        backgroundColor: 'white'
    },

    listTitle: {
             fontSize: 20,
             fontFamily: Fonts.Quicksand,
             color: 'black'
    },

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        color: '#F5FCFF',
        fontFamily: Fonts.Quicksand
    },

    subtitleShow: {
        fontSize: 17,
        paddingLeft: 10,
        marginBottom: 10,
        color: '#F5FCFF',
        fontFamily: Fonts.Quicksand
    },

    textForThumbnail: {
        color: '#f1faee',
        fontSize: 19,
        fontFamily: Fonts.QuicksandReg,
        textAlign: 'center',
        textAlignVertical:"center"
    }

})

export default ComicList