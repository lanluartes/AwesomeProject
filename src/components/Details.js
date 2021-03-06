import React, {Component} from 'react';
import {View, 
        Text, 
        StyleSheet, 
        ImageBackground,
        TouchableWithoutFeedback, 
        ScrollView,
        Dimensions,
        PermissionsAndroid
    } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/FontAwesome'
import TextGradient from 'react-native-linear-gradient'
import { Fonts } from '../utils/Fonts';
import MyView from './MyProps/MyView'
import Orientation from 'react-native-orientation'
import PushNotification from 'react-native-push-notification'
import PushController from '../../PushController'


const {width, height} =  Dimensions.get('window')

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {relation: 'unliked'}
        this.state = {isDownloaded: false}
        this.state = {isBought: 'unbought'}
      }


    //add the blue indication on the download button if the download is on going or change the icon if the video is downloaded
    checkIfDownloaded = (item) => {

        // only change the indication if downloaded. (icon)
        // item.VideoFileName will be the one to be searched.
        //item.VideoFileName = this.props.navigation.params...

        let dirs = RNFetchBlob.fs.dirs
        
        RNFetchBlob.fs.exists(dirs.SDCardApplicationDir + `/files/${item.VideoTitle}.mp4`)
        .then((exist) => {
            this.setState({isDownloaded: exist})

        })
        .catch((e) => { console.log(e) })

    }

    deleteVideo = (item) => {

        let dirs = RNFetchBlob.fs.dirs

        RNFetchBlob.fs.unlink(dirs.SDCardApplicationDir + `/files/${item.VideoTitle}.mp4`)
        .then(() => {

            this.setState({isDownloaded: false})

        })
        .catch((err) => { console.log(err) })
    }
 
    downloadVideo = (item) => {

        //add a function to make a blue circle while downloading. 
        //also add a function that makes 

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
                    })
                    .then((res) => {
                        console.log(res.path())
                        this.setState({isDownloaded: true})
                    })
                }else{
                    this.checkIfDownloaded(item)
                }
        })
            
            
            
    }

    determineIfLiked = (videoID, userID) => {

        const axios = require('axios');
        const myData = new FormData();

        myData.append("userID", userID)
        myData.append("videoID", videoID)

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/checkVideoUser',
            data: myData
          })
          .then(res => this.updateRelation(JSON.parse(res.data)))

    }

    updateRelation = data => {
        //this is for knowing if it's liked.
        this.setState({relation: data.relation})
    }

    
    componentDidMount(){
        Orientation.lockToPortrait()
        
        this.determineIfLiked(this.props.navigation.state.params.passProps.item.IdNo, this.props.navigation.state.params.passProps.user.userID);
        this.determineIfBought(this.props.navigation.state.params.passProps.item.IdNo, this.props.navigation.state.params.passProps.user.userID);        
        this.checkIfDownloaded(this.props.navigation.state.params.passProps.item)
        
    }
    
    _gotoVideo(item) {
        this.props.navigation.navigate(
            'Video', 
            { passProps: {
                item
            }
        }
        )
    }
    
    updateLike = (videoID, userID) => {
        
        const axios = require('axios');
        const myData = new FormData();
        myData.append("videoID", videoID);
        myData.append("userID", userID);
        
        if(this.state.relation === 'liked'){
            myData.append("actionID", 0);
        }else if(this.state.relation === 'unliked'){
            myData.append("actionID", 1);
        }
        
        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/likeVideo',
            data: myData
        }).then(() => this.determineIfLiked(videoID, userID))
    }

    determineTransaction = data => {
        console.log(data)
        if(data.payment == "successful"){
            this.setState({isBought: 'bought'})
            this.displayIcon(this.state)

        }else if(data.payment == "unsuccessful"){
            this.setState({isBought: 'unbought'})
        }

    }
    
    determineIfBought = (videoID, userID) => {
        const axios = require('axios');
        const myData = new FormData();
        
        myData.append("userID", userID)
        myData.append("videoID", videoID)

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/checkIfBought',
            data: myData
          })
          .then(res => this.updateBought(JSON.parse(res.data)))
    }


    updateBought = data => {
        this.setState({isBought: data.relation})
    }


    buyVideo = (videoID, userID) => {

        const axios = require('axios');
        const myData = new FormData();
        myData.append("videoID", videoID);
        myData.append("userID", userID);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/buyVideo',
            data: myData
          })
          .then((res) => this.determineTransaction(JSON.parse(res.data)))
    }


    displayIcon = data => {

        console.log(data)
        if(data.isBought == 'bought'){
                 return(
                 //if bought show this
                <Icon 
                style={styles.iconPlay}
                name="play-circle"
                size={90}
                color="white"
                />
                )
        }else if(data.isBought == 'unbought'){
                return(
                //if unbought show this
                    <Icon 
                    style={styles.iconPlay}
                    name={"tint"}
                    size={90}
                    color="white"
                    />
                  )
        }
    }

    render(){
        const {navigation} = this.props

        async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  'title': 'Wash App Kids!',
                  'message': 'Wash App Kids! needs permission to access files for download. '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
              } else {
                console.log("Camera permission denied")
              }
            } catch (err) {
              console.warn(err)
            }
          }
 
       return(
            <ScrollView style={styles.container}>
                <PushController />
                <ImageBackground 
                style={styles.thumbnail}
                source={{uri: 'http://10.0.2.2/wash-admin/'+navigation.state.params.passProps.item.thumbnailPath}}
                >
                    <View style={styles.buttonPlay}>
                    
                        <TouchableWithoutFeedback onPress={() => this.state.isBought == 'bought' ? this._gotoVideo(navigation.state.params.passProps.item) : this.buyVideo(navigation.state.params.passProps.item.IdNo, navigation.state.params.passProps.user.userID)}>
                                <View>
                                     {this.displayIcon(this.state)}
                                </View>
                        </TouchableWithoutFeedback>

                    </View>
                <View style={styles.nameContainer}>
                    <TextGradient colors={['transparent', '#181818', '#181818']}>
                        <Text style={[styles.text, styles.titleShow]}>
                            {navigation.state.params.passProps.item.VideoTitle}
                        </Text>
                    </TextGradient>
                </View>
                </ImageBackground>


                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subTitleText]}></Text>
                        <Text style={[styles.text, styles.subTitleText]}></Text>
                        <Text style={[styles.text, styles.subTitleText]}></Text>
                    </View>

                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{navigation.state.params.passProps.item.VideoDescription}</Text>
                    </View>

                    <Text style={styles.text}>{navigation.state.params.passProps.item.viewCount} views</Text>
                    <Text style={styles.text}>Cast: {navigation.state.params.passProps.item.VideoAuthor}</Text>
                    <Text style={styles.text}>Creator: {navigation.state.params.passProps.item.VideoAuthor}</Text>

                    <View style={styles.shareListIcon}>
                            <TouchableWithoutFeedback
                                onPress={() => this.updateLike(navigation.state.params.passProps.item.IdNo, navigation.state.params.passProps.user.userID)}
                            >
                                <View style={styles.myListIcon}>
                                        <Icon 
                                        style={styles.listIcon}
                                        name={'heart' + (this.state.relation === 'liked' ? '' : '-o')}
                                        color={(this.state.relation === 'liked' ? '#F25F5C' : '#2c3e50')}
                                        size={25}
                                        />
                                        <Text style={styles.text}>My List</Text>                           
                                </View>
                            </TouchableWithoutFeedback>   


                        {/* this is the view to hide the download button if it is already downloaded. */}
                        <MyView hide={this.state.isDownloaded}> 
                            <TouchableWithoutFeedback
                                onPress={() => this.downloadVideo(navigation.state.params.passProps.item)}
                            >
                                <View style={styles.myDownloadIcon}>
                                    <Icon 
                                            style={styles.DownloadIcon}
                                            name='arrow-circle-down'
                                            color='#2c3e50'
                                            size={25}
                                        />
                                    <Text style={styles.text}>Download</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </MyView>
                        
                        <MyView hide={!this.state.isDownloaded}> 
                            <TouchableWithoutFeedback
                                onPress={() => this.deleteVideo(navigation.state.params.passProps.item)}
                            >
                                <View style={styles.myDownloadIcon}>
                                    <Icon 
                                            style={styles.DownloadIcon}
                                            name='times-circle-o'
                                            color='#F25F5C'
                                            size={26}
                                        />
                                    <Text style={styles.text}>Delete</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </MyView>

                    </View>

                    

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    nameContainer: {
        backgroundColor: 'transparent'
    },
    
    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        color: '#F5FCFF',
        fontFamily: Fonts.Quicksand
    },
    description: {
        marginVertical: 10
    },

    container: {
        flex: 1,
        backgroundColor: '#181818'
    },

    thumbnail: {
        width: width,
        height: 300
    },

    buttonPlay: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },

    iconPlay: {
        opacity: 0.5,
        backgroundColor: 'transparent'
    },

    descriptionContainer: {
        paddingHorizontal: 20
    },

    subtitle: {
        flexDirection: 'row'
    },

    subTitleText: {
        marginRight: 20
    },

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg
    },

    shareListIcon: {
        flexDirection: 'row',
        marginVertical: 30,
    },

    listIcon: {
        height: 25
    },

    DownloadIcon: {
        height: 25
    },

    myListIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40
    },

    myDownloadIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    light: {
        fontWeight: '200'
    }

})

export default Details