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
        return(
            <View style={styles.container}>
                <VideoPlayer
                source={{uri: 'http://10.0.2.2/sampl2/'+navigation.state.params.passProps.item.VideoPath}}
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