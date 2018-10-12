import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage} from 'react-native'
import { Fonts } from '../src/utils/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome'


export default class DrawerScreen extends React.Component {

    signOut = () => {
                AsyncStorage.removeItem('userID')
                AsyncStorage.removeItem('connection')
                this.props.navigation.navigate("LogIn")
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.iconContainer}>

                    <Icons
                    size={150}
                    name={"tint"}
                    color={'powderblue'}
                    />

                    <Text style={styles.name}>
                        Wash Points:
                    </Text>
                    <Text style={styles.points}>
                        100
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
            
                <View style={{ flex: 0.5, padding: 2, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center'}}>  

                    <TouchableOpacity style={{height: 75, width: 275}}
                    onPress={() => this.signOut()}
                    >

                        <View style={{flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'center'}}>
                            <Text style={styles.signoutRow}>
                                    Sign out
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
        backgroundColor: '#1C2826'
    },

    iconContainer: {
        flex: 2,
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

    points: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 23,
        color: 'white'
    },

    listRow: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 19,
        marginLeft: '10%',
        color: 'white'
        
    },

    signoutRow: {
        fontFamily: Fonts.QuicksandBold,
        fontSize: 19,
        color: 'white'
    },
    
    listIcon: {
        height: 25
    },

});