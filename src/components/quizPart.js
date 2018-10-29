import React, {Component} from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation'
import { NavigationActions } from 'react-navigation'
import { Fonts } from '../utils/Fonts';
import CountDown from 'react-native-countdown-component';

class QuizPart extends Component{

 static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {seconds: 30}
  }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _back(){
        Orientation.lockToPortrait()
        this.props.navigation.dispatch(NavigationActions.back('Details'))
    }

    timerCountdown = () => {
        console.log("timerCountdown")
        return (
            <View>
                <CountDown
                            until={this.state.seconds}
                            timeToShow={['S']}
                            onTimerChange={until=>console.log(until)}
                            labelS
                            size={50}
                />
            </View>
        )
    }

    changeSeconds = sec => {
        console.log(sec)
        this.setState({seconds: sec})
        // this.timerCountdown()
    } 

    render(){
        const {navigation} = this.props
        return(
            <View style={styles.container}>
                <View style={styles.timerContainer}>
                  {this.timerCountdown()}            
                </View>
                    <View style={{flex: 0.2, backgroundColor: '#F5FCFF'}}>
                        <View
                            style={styles.questionContainer}
                            >
                            <Text style={styles.questionText}>
                                What is the largest planet?
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.6, backgroundColor: '#F5FCFF'}}>
                        <View
                            style={[styles.answerContainer, {borderTopWidth: 2, borderTopStartRadius: 5, borderTopEndRadius: 5}]}
                            >
                            <Text style={styles.questionText}>
                                Pluto
                            </Text>
                        </View>
                        <View
                            style={styles.answerContainer}
                            >
                            <Text style={styles.questionText}>
                                Earth
                            </Text>
                        </View>
                        <View
                            style={styles.answerContainer}
                            >
                            <Text style={styles.questionText}>
                                Jupiter
                            </Text>
                        </View>
                        <View
                            style={[styles.answerContainer, {borderBottomWidth: 2, borderBottomStartRadius: 5, borderBottomEndRadius: 5}]}
                            >
                            <Text style={styles.questionText}>
                                Saturn
                            </Text>
                        </View>
                    </View>

                    {/* <Button
                        title="answer"
                        onPress={() => this.changeSeconds(30)}
                    /> */}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    timerContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignContent: 'center'
    },

    questionContainer: {
        flex: 0.8, 
        backgroundColor: '#F5FCFF', 
        borderStyle: 'dashed', 
        borderColor: '#30BCED', 
        borderRadius: 5, 
        borderWidth: 2, 
        margin: 10,


        justifyContent: 'center',
        alignItems: 'center'
    },

    answerContainer: {
        flex: 0.2, 
        backgroundColor: '#F5FCFF', 
        borderStyle: 'dashed', 
        borderColor: '#30BCED', 
        borderWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2, 
        marginHorizontal: 5,

        justifyContent: 'center',
        alignItems: 'center'
    },



    questionText: {
        fontFamily: Fonts.Quicksand,
        fontSize: 16
    },

    counterText: {
        fontSize: 50,
        fontFamily: Fonts.Quicksand
    }

})

export default QuizPart