import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Fonts } from '../src/utils/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'


export default class DrawerScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>

                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={{uri: 'http://10.0.2.2/wash-admin/thumbnails/7.jpg'}}
                    />
                    <Text style={styles.name}>
                        Allan Luartes
                    </Text>
                </View>

                <View style={{ flex: 2, padding: 2, flexDirection: 'column', flexWrap: 'wrap'}}>
                   
                    <TouchableOpacity style={{height: 75, width: 275}}
                    onPress={() => {this.props.navigation.navigate('MyList')}}
                    >
                        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
                            <Ionicons 
                            size={30}
                            name={"md-heart"}
                            color={'#F25F5C'}
                            />
                            <Text style={styles.listRow}>
                                    My List
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height: 75, width: 275}}
                    onPress={() => {this.props.navigation.navigate('MyList')}}
                    >
                        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
                            <Icons 
                            size={30}
                            name={"trophy"}
                            color={"#FFE066"}
                            />
                            <Text style={styles.listRow}>
                                    My Achievements
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#247BA0'
    },

    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        width: 150,
        height: 150,
        borderRadius: 75
    },

    name: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 19,
        color: 'white'
    },

    listRow: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 19,
        marginLeft: '10%',
        color: 'white'
    },
    
    listIcon: {
        height: 25
    },

});