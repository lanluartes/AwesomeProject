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

        console.log(this.props.navigation.state.params.passProps.item.IdNo)

        this.setState({videoID: this.props.navigation.state.params.passProps.item.IdNo})

        Orientation.lockToPortrait();
    }

    getUser = async () => {
        const value = await AsyncStorage.getItem('userID');

        this.setState({userID: value})
    }


    getQuestions = () => {
        const {navigation} = this.props

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
                            onTimerChange={until=>{this.setState({seconds: until})}}
                            //onFinish={console.log('finish')}
                            labelS
                            size={50}
                />
            </View>
        )
    }

    changeSeconds = sec => {
        this.setState({seconds: sec})
    } 

    iterate = () => {


        let curQues = this.state.questions.pop()

        if(curQues != undefined){
            this.setState({
                currentQuestion: curQues.questionContent,
                currentChoice1: curQues.choiceOne,
                currentChoice2: curQues.choiceTwo,
                currentChoice3: curQues.choiceThree,
                currentCorrect: curQues.correctAnswer
            })
        }else{
            this.endQuiz();
        }
            
    }

    endQuiz = () => {
            this.setAnswered();
            if(this.state.playerPoints == 5 ){
                this.refundPoints()
            }
            this._back();
    }


    setAnswered = () => {
        const {navigation} = this.props

        const axios = require('axios');
        const myData = new FormData();

        myData.append("userID", this.state.userID);
        myData.append("videoID", navigation.state.params.passProps.item.IdNo);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/setAnswered',
            data: myData
          })
    }

    refundPoints = () => {
        const axios = require('axios');
        const myData = new FormData();

        myData.append("userID", this.state.userID)
        myData.append("amountToAdd", 100)

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/addMoney',
            data: myData
          })
          .then(res => this.addMoney(res.data))
    }

    checkIfRight = data => {
        console.log(data)
            if(data == this.state.currentCorrect){

                let point = this.state.playerPoints
                point += 1;

                this.setState({playerPoints: point});
            }
            this.iterate()
    }

    addMoney = data => {
        console.log(data)
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
                                {this.state.currentQuestion}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.6, backgroundColor: '#F5FCFF'}}>
                        
                        <TouchableWithoutFeedback
                            onPress={() => this.checkIfRight(this.state.currentChoice1)}
                        >
                            <View
                                style={[styles.answerContainer, {borderTopWidth: 2, borderTopStartRadius: 5, borderTopEndRadius: 5}]}
                                >
                                <Text style={styles.questionText}>
                                {this.state.currentChoice1}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => this.checkIfRight(this.state.currentChoice2)}
                        >
                            <View
                                style={styles.answerContainer}
                                >
                                <Text style={styles.questionText}>
                                {this.state.currentChoice2}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
            
                        <TouchableWithoutFeedback
                            onPress={() => this.checkIfRight(this.state.currentChoice3)}
                        >
                            <View
                                style={[styles.answerContainer, {borderBottomWidth: 2, borderBottomStartRadius: 5, borderBottomEndRadius: 5}]}
                                >
                                <Text style={styles.questionText}>
                                {this.state.currentChoice3}
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