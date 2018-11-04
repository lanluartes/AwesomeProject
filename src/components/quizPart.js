import React, {Component} from 'react'
import { TouchableWithoutFeedback, Text, View, StyleSheet, AsyncStorage } from 'react-native'
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
    this.state = {
        userID: 0,
        seconds: 30, 
        questions: [],
        currentQuestion: "",
        currentChoice1: "",
        currentChoice2: "",
        currentChoice3: "",
        currentCorrect: "",
        playerPoints: 0
    }
  }

    componentDidMount(){

        this.getUser();
        this.getQuestions();

        Orientation.lockToPortrait();
    }

    getUser = async () => {
        const value = await AsyncStorage.getItem('userID');

        this.setState({userID: value})
    }

    getQuestions = () => {
        const {navigation} = this.props

        //console.log(navigation);

        const axios = require('axios');
        const myData = new FormData();

        myData.append("videoID", navigation.state.params.passProps.item.IdNo)

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/getQuestions',
            data: myData
          })
          .then(res => this.assignQuestions(res.data))
    }

    assignQuestions = data => {
        this.setState({questions: data})
        this.iterate();
    }

    _back(){
        Orientation.lockToPortrait()
        this.props.navigation.dispatch(NavigationActions.back('Details'))
    }

    timerCountdown = () => {
        return (
            <View>
                <CountDown
                            until={this.state.seconds}
                            timeToShow={['S']}
                            //onTimerChange={until=>console.log()}
                            //onFinish={console.log('finish')}
                            labelS
                            size={50}
                />
            </View>
        )
    }

    changeSeconds = sec => {
        //console.log(sec)
        this.setState({seconds: sec})
    } 

    iterate = () => {
        this.state.questions.forEach((question) => {
            console.log(question.questionContent);
        })
        
        //console.log(this.state.currentQuestion)
    }

    render(){
        const {navigation} = this.props
        //console.log(this.state.currentQuestion)
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
                        
                        <TouchableWithoutFeedback>
                            <View
                                style={[styles.answerContainer, {borderTopWidth: 2, borderTopStartRadius: 5, borderTopEndRadius: 5}]}
                                >
                                <Text style={styles.questionText}>
                                    Pluto
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <View
                                style={styles.answerContainer}
                                >
                                <Text style={styles.questionText}>
                                    Earth
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
            
                        <TouchableWithoutFeedback>
                            <View
                                style={[styles.answerContainer, {borderBottomWidth: 2, borderBottomStartRadius: 5, borderBottomEndRadius: 5}]}
                                >
                                <Text style={styles.questionText}>
                                    Saturn
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
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