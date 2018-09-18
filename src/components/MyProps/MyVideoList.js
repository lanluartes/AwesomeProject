import React from 'react'
import {View, Text, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'

class MyVideoList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {data: []}
      }

    componentDidMount(){
        this.getLikedVideos()
    }

    getLikedVideos = () => {
        const axios = require('axios');
        const myData = new FormData();

        myData.append("userID", this.props.user.userID)

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/getMyVideos',
            data: myData
          })
          .then(res => this.setState({data: res.data}));
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

    try = () => {
        this.props.navigation.navigate('Details')
    }

    _showList = (data,user) => {
        return(
            <TouchableWithoutFeedback onPress={() => this._newPushContent(data, user)}>
                <Image style={{width: 120, height: 180, margin: 5}} source={{uri: 'http://10.0.2.2/wash-admin/'+data.thumbnailPath}}/>
            </TouchableWithoutFeedback>
        )
    }

    render(){
        const { user } = this.props

        return(
            <ScrollView style={{flex: 1}}>
                <View>
                    <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        ItemSeparatorComponent ={() => <View style={{width: 5}} />}
                        renderItem={({item}) => this._showList(item, user)} 
                        data={this.state.data}
                    />

                    {/* <TouchableWithoutFeedback onPress={() => this.try()}>
                        <View>
                            <Text>go to somewhere</Text>
                        </View>
                    </TouchableWithoutFeedback> */}

                </View>
            </ScrollView>
        );
    }

}

export default MyVideoList;