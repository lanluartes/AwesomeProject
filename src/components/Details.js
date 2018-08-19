import React, {Component} from 'react';
import {View, 
        Text, 
        StyleSheet, 
        ImageBackground, 
        TouchableHighLight, 
        TouchableWithoutFeedback, 
        ScrollView,
        Dimensions
    } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import TextGradient from 'react-native-linear-gradient'
import { Fonts } from '../utils/Fonts';
import Orientation from 'react-native-orientation'

const {width, height} =  Dimensions.get('window')

class Details extends Component {
    
    componentWillMount(){
        Orientation.lockToPortrait()
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

    render(){
        const {navigation} = this.props
        console.log(navigation.state.params.passProps.item.VideoTitle, "###################TANGINA SOBRANG NAKAKALITO##############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################")
        return(
            <ScrollView style={styles.container}>
                <ImageBackground 
                style={styles.thumbnail}
                source={{uri: 'http://10.0.2.2/wash-admin/'+navigation.state.params.passProps.item.thumbnailPath}}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback onPress={() => this._gotoVideo(navigation.state.params.passProps.item)}>
                            <View>
                                    <Icon 
                                    style={styles.iconPlay}
                                    name="play-circle"
                                    size={90}
                                    color="white"
                                     />
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
                            <View style={styles.myListIcon}>
                                    <Icon 
                                    style={styles.listIcon}
                                    name='heart-o'
                                    color='#2c3e50'
                                    size={25}
                                    />
                                    <Text style={styles.text}>My List</Text>
                            </View>

                            <View style={styles.myShareIcon}>
                                <Icon 
                                        style={styles.shareIcon}
                                        name='share'
                                        color='#2c3e50'
                                        size={25}
                                        />
                                <Text style={styles.text}>Share</Text>
                            </View>
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

    shareIcon: {
        height: 25
    },

    myListIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40
    },

    myShareIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    light: {
        fontWeight: '200'
    }

})

export default Details