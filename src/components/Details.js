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
import IonIcons from 'react-native-vector-icons/Ionicons'
import TextGradient from 'react-native-linear-gradient'
import { Fonts } from '../utils/Fonts';
import Orientation from 'react-native-orientation'

const {width, height} =  Dimensions.get('window')

class Details extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: '#181818'},
        headerTintColor: 'white'
            
}

    componentWillMount(){
        Orientation.lockToPortrait()
    }

    render(){
        const {navigation} = this.props
        const {name} = navigation.state.params.passProps.item
        const {thumbnail, cast, description, year, creator, numOfEpisodes, season} = navigation.state.params.passProps.item.details
   
        return(
            <ScrollView style={styles.container}>
                <ImageBackground 
                    style={styles.thumbnail}
                    source={{uri: thumbnail}}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Video')}>
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
                            {name}
                        </Text>
                    </TextGradient>
                </View>
                </ImageBackground>


                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subTitleText]}>{year}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{numOfEpisodes}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{season}</Text>
                    </View>

                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{description}</Text>
                    </View>

                    <Text style={styles.text}>Cast: {cast}</Text>
                    <Text style={styles.text}>Creator: {creator}</Text>

                    <View style={styles.shareListIcon}>
                            <View style={styles.myListIcon}>
                                    <IonIcons 
                                    style={styles.listIcon}
                                    name='md-checkmark'
                                    color='#2c3e50'
                                    size={25}
                                    />
                                    <Text style={styles.text}>My List</Text>
                            </View>

                            <View style={styles.myShareIcon}>
                                <Icon 
                                        style={styles.shareIcon}
                                        name='share-alt'
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