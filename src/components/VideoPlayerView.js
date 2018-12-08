import React, {Component} from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { NavigationActions } from 'react-navigation'

class VideoPlayerView extends Component{

 static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {userID: null}
  }

    _addViewCount = data => {
        const axios = require('axios');
        const myData = new FormData();
        myData.append("videoID", data);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/addView',
            data: myData
          })

    }

    componentDidMount(){
        Orientation.lockToLandscape()
        const {navigation} = this.props
        this._addViewCount(navigation.state.params.passProps.item.IdNo);
        this.getUser();
    }

    componentWillUnmount(){
        Orientation.lockToPortrait()      
    }

    _back(){
        Orientation.lockToPortrait()
        this.props.navigation.dispatch(NavigationActions.back('Details'))
    }

    goToQuiz = (item) => {
        //navigation.state.params.passProps.item
        this.props.navigation.navigate(
            'QuizPart', 
            { passProps: {
                item
            }
        }
        )
    }

    getUser = async () => {
        const value = await AsyncStorage.getItem('userID');

        this.setState({userID: value})
    }

    isIt = (data) => {

        console.log(data.isAnswered, "isIt")

        if(data.isAnswered == "true"){
            this._back();
        }
        else if(data.isAnswered == "false")
        {
            this.goToQuiz(this.props.navigation.state.params.passProps.item);
        }

        if(data.isAnswered == true){
            console.log('elo')
        }
        else if(data.isAnswered == false)
        {
            console.log('aye')
        }

    }

    //to check if the user answered the question for the corresponding video
    checkIfAnswered = (videoID) => {
        //navigation.state.params.passProps.item.IdNo
        const axios = require('axios');
        const myData = new FormData();

        
        myData.append("userID", this.state.userID);
        myData.append("videoID", videoID);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/checkIfAnswered',
            data: myData
          })
        .then(res => this.isIt(res.data))
    }

    render(){
        const {navigation} = this.props
        return(
            <View style={styles.container}>
                <VideoPlayer
                source={{uri: 'http://10.0.2.2/wash-admin/'+navigation.state.params.passProps.item.VideoPath}}
                title={<Text>{navigation.state.params.passProps.item.VideoTitle}</Text>}
                navigator={this.props.navigator}
                onBack={() => this._back()}
                onEnd={() => this.checkIfAnswered(navigation.state.params.passProps.item.IdNo)}
                fullscreen={true}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})

export default VideoPlayerView