import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, Image, TouchableWithoutFeedback, ScrollView} from 'react-native'
import { Fonts } from '../utils/Fonts';
import Orientation from 'react-native-orientation'

class List extends Component {

    static navigationOptions = {
        headerStyle: {backgroundColor: '#181818'},
        headerTintColor: 'white' 
    }

    constructor() {
        super();
        this.state = {data: []}
      }

    componentWillMount(){
        Orientation.lockToPortrait()
    }

    componentDidMount(){
        this.getData()
    }

    async getData() {
        try {
          let response = await fetch(
            'http://10.0.2.2/wash-admin/public/api/videos'
          );

          let responseJson = await response.json();
          this.setState({ data: responseJson});
        } catch (error) {
          console.error(error);
        }
      }


    _newPushContent = (item,user) => {
        this.props.navigation.navigate(
           'Details',
           { passProps: {
                item,
                user
                }
            }
        )
    }

    _showList = (data,user) => {
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(data, user)}>
                <Image style={{width: 120, height: 180, margin: 5}} source={{uri: 'http://10.0.2.2/wash-admin/'+data.thumbnailPath}}/>
            </TouchableWithoutFeedback>
        )
    }
    
    _renderItem(item){
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(item)}>
                <Image style={{width: 120, height: 180, margin: 5}} source={{uri: item.image}}/>
            </TouchableWithoutFeedback>
        )
    }

    render(){

        const {user} = this.props

        return(
            <ScrollView style={{flex: 1}}>
                <View>
                    {/* <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                        renderItem={({item}) => this._renderItem(item)} 
                        data={shows_first}
                    /> */}
                    <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                        renderItem={({item}) => this._showList(item, user)} 
                        data={this.state.data}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    listTitle: {
            fontSize: 20,
             fontFamily: Fonts.Quicksand,
             color: 'black'
    }

})

export default List