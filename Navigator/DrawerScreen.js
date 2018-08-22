import React from 'react'
import {View, Text, Button } from 'react-native'

export default class DrawerScreen extends React.Component {

    render(){
        return(
            <View>
                <Text> I AM HERE </Text>
                {/* <Button 
                    title='Hello'
                    //onPress={console.log(this.props)}
                /> */}
                <View style={{height: 100 , backgroundColor: 'powderblue'}}>
                </View>
            </View>
        );
    }
}