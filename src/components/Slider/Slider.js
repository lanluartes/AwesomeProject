import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window')

const Slider = props => ( 
    <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
    )


const styles = {
    container:{
        flex:1,
        justifyContent: 'center'
    },

    image: {
       width: 100,
       height: 100
    }
}

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagesSlider: [
            ]
        }
    }

        render(){
            return(

                <View>
                    <Swiper
                        autoplay
                        height={240}
                    >
                    {
                        this.state.imagesSlider.map((item,i) => <Slider 
                        uri={item}
                        key={i}
                        />)
                    }
                    </Swiper>
                </View>

            )};
}