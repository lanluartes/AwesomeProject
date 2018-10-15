import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, Button} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import PushNotification from 'react-native-push-notification'
import CheckBox from 'react-native-checkbox'
import { Fonts } from '../utils/Fonts';

export default class DownloadRange extends Component {

    // this module will download a series of comic chapters.
    // this.props.navigation.params.passProps.item
    // store the object into an array and then loop the range 

    //const {navigation} = this.props

    constructor() {
        super();
        this.state = {data: []}
        this.state = {toBeDownloaded: []}
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



    downloadComics = (title, item) => {

        //find a way to show the progress of the download

        let dirs = RNFetchBlob.fs.dirs

        RNFetchBlob.fs.exists(dirs.SDCardApplicationDir + `/files/${title}/${item.chapterTitle}.pdf`)
        .then((exists) => {
                if(!exists){
                    RNFetchBlob
                    .config({fileCache: true,
                            path:dirs.SDCardApplicationDir  +  `/files/${title}/${item.chapterTitle}.pdf`
                    })
                    .fetch('GET', 'http://10.0.2.2/wash-admin/'+item.chapterPath, {})
                    .progress({ interval : 200 }, (received, total) => {
                        console.log('progress ' + Math.floor(received/total*100) + '%')
                        // PushNotification.localNotification({
                        //     title: "My Notification Title",
                        //     message: "My Notification Message", // (required)
                        // })
                    })
                }else{
                    alert(item.chapterTitle +  " already downloaded.")
                }
        })

        //    console.log(item.chapterTitle + " belongs to "+ title)
        //    console.log(item)
    }

    addToArray = (checked,item, index) => {
        if(checked == true){
                this.state.toBeDownloaded.push(item)
        }else if(checked == false){
                this.state.toBeDownloaded.splice(index)
        }

        console.log(this.state.toBeDownloaded)
    }

    startDownload = () => {
        console.log(this.props.navigation.state.params.passProps.comicTitle)
        this.state.toBeDownloaded.forEach(element => this.downloadComics(this.props.navigation.state.params.passProps.comicTitle, element))
    }

    _renderItem(item, index){
        return(
            <TouchableWithoutFeedback style={{marginLeft: 5}} onPress={() => this._newPushContent(item)}>
                <View style={styles.textContainer}>
                    <CheckBox   
                    label=''
                    onChange={(checked) => {this.addToArray(checked, item, index)}}
                    />
                     <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit minimumFontScale={.5} style={styles.text}> Chapter {item.chapterNo}: {item.chapterTitle} </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _newPushContent = item =>{
            
    }

render(){
    return(
    <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#EFF7F6'}}>
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                    renderItem={({item, index}) => this._renderItem(item, index)} 
                    data={this.state.data}
                />
        </View>

        <View style={styles.titleButtonContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.navigation.state.params.passProps.comicTitle}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                title="Download"
                onPress={()=>{this.startDownload()}}
                style={{margin: 10}}
                />
            </View>
        </View>
    </View>
    )
    }

}

const styles = StyleSheet.create({

    titleButtonContainer:{
        flex: 0.1,
        backgroundColor: '#1d3557',
        flexDirection: 'row'
    },

    titleContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignContent: 'center'
    },

    buttonContainer:{
        flex: 0.6,
        justifyContent: 'center',
        alignContent: 'center'
    },

    title:{
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    
    text: {
        color: '#1d3557',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg,
        textAlignVertical: 'center',
        paddingBottom: 10
    },
    
    textContainer: {
        marginVertical: 2,
        marginLeft: 5,
        flexDirection: "row"
    },
    
});