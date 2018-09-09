import React, {Component} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { NavigationActions } from 'react-navigation'

class VideoPlayerView extends Component{

 static navigationOptions = {
    header: null
  };

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
    }

    componentWillUnmount(){
        Orientation.lockToPortrait()
    }

    _back(){
        Orientation.lockToPortrait()
        this.props.navigation.dispatch(NavigationActions.back('Details'))
    }

    render(){
        const {navigation} = this.props
        console.log(navigation.state.params.passProps.item)
        return(
            <View style={styles.container}>
                <VideoPlayer
                source={{uri: 'http://10.0.2.2/wash-admin/'+navigation.state.params.passProps.item.VideoPath}}
                title={<Text>{navigation.state.params.passProps.item.VideoTitle}</Text>}
                navigator={this.props.navigator}
                onBack={() => this._back()}
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