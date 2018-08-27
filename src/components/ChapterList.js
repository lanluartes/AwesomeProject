import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { Fonts } from '../utils/Fonts';
import Modal from 'react-native-modal';

const {width, height} =  Dimensions.get('screen')

export default class ChapterList extends Component{


    constructor() {
        super();
        this.state = {data: []}
      }

    componentDidMount(){
        this.getChapter()
    }

    componentDidMount(){
        this.getChapter()
    }
    

   getChapter = () => {
        const {currentComicData} = this.props
        const axios = require('axios');
        const myData = new FormData();
        myData.append("id",currentComicData.SeriesID);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/series',
            data: myData
          })
          .then(res => this.assignChapters(res.data));   
    }

    assignChapters = item => {
        this.setState({data: item})
    }


    _renderItem(item){
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(item)}>
                <View style={styles.textContainer}>
                  <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={styles.text}> Chapter {item.chapterNo}: {item.chapterTitle} </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _newPushContent = item =>{
        this.props.closeModal(false);
        this.props.navigation.navigate(
            'comicViewer',
            { passProps: {
                 item
                 }
             }
         )
    }

render(){
    return(
    <View style={{flex: 1}}>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                renderItem={({item}) => this._renderItem(item)} 
                data={this.state.data}
            />
    </View>
    )
}
}
const styles = StyleSheet.create({

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg,
        textAlignVertical: 'center'
    },

    textContainer: {
        marginVertical: 2
    },


})

