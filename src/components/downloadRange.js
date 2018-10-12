import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, CheckBox, TouchableWithoutFeedback, ScrollView} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import PushNotification from 'react-native-push-notification'
import { Fonts } from '../utils/Fonts';

export default class DownloadRange extends Component {

    // this module will download a series of comic chapters.
    // this.props.navigation.params.passProps.item
    // store the object into an array and then loop the range 

    //const {navigation} = this.props

    constructor() {
        super();
        this.state = {data: []}
        //maybe add an array for the selected chapter?
      }

    componentDidMount = () =>{
        this.getChapter(this.props.navigation.state.params.passProps.seriesID);
    }

    getChapter = SeriesID => {
        const axios = require('axios');
        const myData = new FormData();
        myData.append("id", SeriesID);

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

    downloadComics = (item) => {

        //find a way to show the progress of the download

        let dirs = RNFetchBlob.fs.dirs

        RNFetchBlob.fs.exists(dirs.SDCardApplicationDir + `/files/${item.VideoTitle}.mp4`)
        .then((exists) => {
                if(!exists){
                    RNFetchBlob
                    .config({fileCache: true,
                            path:dirs.SDCardApplicationDir  + `/files/${item.VideoTitle}.mp4`
                    })
                    .fetch('GET', 'http://10.0.2.2/wash-admin/'+item.VideoPath, {})
                    .progress({ interval : 200 }, (received, total) => {
                        console.log('progress ' + Math.floor(received/total*100) + '%')
                        PushNotification.localNotification({
                            title: "My Notification Title",
                            message: "My Notification Message", // (required)
                        })
                    })
                    .then((res) => {
                        this.setState({isDownloaded: true})
                    })
                }else{
                    this.checkIfDownloaded(item)
                }
        })
            
            
            
    }


    _renderItem(item){
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(item)}>
                <View style={styles.textContainer}>
                  <CheckBox/>
                  <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={styles.text}> Chapter {item.chapterNo}: {item.chapterTitle} </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _newPushContent = item =>{
            
    }

render(){
    return(
    <View style={{flex: 1, backgroundColor: 'powderblue'}}>
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

let styles = StyleSheet.create({

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg,
        textAlignVertical: 'center'
    },

    textContainer: {
        marginVertical: 2,
        flexDirection: "row"
    },

});