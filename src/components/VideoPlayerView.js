import React, {Component} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { NavigationActions } from 'react-navigation'

class VideoPlayerView extends Component{

 static navigationOptions = {
    header: null
  };

    componentWillMount(){
        Orientation.lockToLandscape()
        console.log(this.props)
    }

    componentWillUnmount(){
        Orientation.lockToPortrait()
    }

    _back(){
        Orientation.lockToPortrait()
        this.props.navigation.dispatch(NavigationActions.back('Details'))
    }

    render(){
        return(
            <View style={styles.container}>
                <VideoPlayer
                source={require('./videos/video.mp4')}
                title={<Text>Designated Survivor</Text>}
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