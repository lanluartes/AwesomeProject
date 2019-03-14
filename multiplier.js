import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { Fonts } from './src/utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome'
import rivervar from '../AwesomeProject/assets/files/riverquest.json'

//focus on collecting the river variables first

class Survey extends React.Component{


    constructor(){
        super()
        this.state={
            checked: [],

            totalCount: 0,

            riverQuest: rivervar,
            questions: [],
            actions : [
                {
                    activity: "Drinking",
                    score: 3
                },
                {
                    activity: "Cooking",
                    score: 2
                },
                {
                    activity: "Bathing",
                    score: 2
                },
                {
                    activity: "Cleaning",
                    score: 1
                },
                {
                    activity: "Laundry",
                    score: 1
                },
                {
                    activity: "Toilet Use",
                    score: 2
                }
              ],

            answerSheet:[],
            questionIndex: 0,
            categoryIndex: 0,
            categoryCount: 0,
            nextText: 'next'

        }
    }

    //make a questionnaire that will collect the multiplier

    // Work on how to display the data

    static navigationOptions = {
        header: null
      };

    componentWillMount(){
        this.setState({questions: this.props.navigation.state.params.genQuestions})

        this.props.navigation.state.params.genQuestions2.forEach(element => {
            // this.state.questions.concat(element)
            this.setState(prevState => ({questions: [...prevState.questions, element]}))
        });
    }

    componentDidMount(){
        // this.setState({questions: this.props.navigation.state.params.genQuestions})
        // console.log("THIS IS THE FIRST OBJECT",this.props.navigation.state.params.genQuestions)
        // console.log("THIS IS THE SECOND OBJECT",this.props.navigation.state.params.genQuestions2)
        console.log(this.props.navigation.state.params.answers)

        // this.setState(prevState => ({questions: ...prevState.questions}))
    }


    componentDidUpdate(prevState, snapshot){

        // console.log("this.state.questions ::::: ",this.state.questions[this.state.questionIndex])

        console.log(this.state.totalCount)
    }

    verifyStatus = data => {
        if(data.relation === 'false'){
            // return a modal that says, they already answered the survey. then return to the homescreen
        }
    }

    getUser = async () => {
        const value = await AsyncStorage.getItem('userID').then()
        this.setState({userID: value})
    }

    sendSurvey = data => {
        // const axios = require('axios');
        // const myData = new FormData();

        // myData.append("Answers", this.props.navigation.state.params.answers)
        // myData.append("Multipliers", this.state.answerSheet)
        // myData.append("userID", this.props.navigation.state.params.userID)

        // axios({
        //     method: 'POST',
        //     url: 'http://10.0.2.2/wash-admin/private/calculatedata',
        //     data: myData
        //   })
        //   .then(res => {console.log(res.data)})
        //   .catch(function(e){console.log(e)})

        // console.log("from survey",this.props.navigation.state.params.answers)


        this.props.navigation.navigate('reward', {totalCount: this.state.totalCount})

    }

    endSurvey = () => {
        this.combine()
        this.sendSurvey()
        console.log(this.state.answerSheet)
    }
    
    combine = () => {
        this.setState(prevState => ({totalCount: prevState.totalCount + this.props.navigation.state.params.totalCount}))
    }

    nextQuestion = () => {
        this.collectAnswer()

        this.setState({checked: []})
        // this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].isDone = true;

        if(this.state.questionIndex < this.state.questions.length - 1 ){

            this.setState(prevState => ({questionIndex: prevState.questionIndex + 1}))

        }else if(this.state.questionIndex === this.state.questions.length - 1){
           
            this.setState({nextText: 'finish'})
            this.endSurvey()

        }
        else{

            this.setState({questionIndex: 0})

        }
    }

    collectAnswer = () => {
        // let someshit = this.state.answerSheet
        // this.state.answerSheet.push({question: this.state.questions[this.state.questionIndex].question, answers: this.state.checked})

        if(Array.isArray(this.state.checked)){
            console.log("LENGTH:",this.state.checked.length)
            this.setState(prevState => ({totalCount: prevState.totalCount + this.state.checked.length}))
        }else{
            console.log("RAW:",this.state.checked)
            this.setState(prevState => ({totalCount: prevState.totalCount + 1}))
        }
    }


    render(){
        return(
            <View style={styles.container}>
            
                {/*where the header starts*/}
                <View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            {'Standards of living and water sources'}
                        </Text>
                    </View>

                    <View style={styles.headerContainer}>
                        <View style={styles.remainingContainer}>
                            <Text style={styles.remainingText}>
                                {this.state.questionIndex + 1 } / {this.state.questions.length}
                            </Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => {this.state.checked.length === 0 ? console.log('nothing selected') : this.nextQuestion()}}>
                            <View style={styles.nextButtonContainer}>
                                    <Text style={styles.nextText}>
                                        {this.state.nextText}
                                    </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


                {/*where the body starts*/}
                <View style={styles.surveyContainer}>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            {
                                this.state.questions[this.state.questionIndex].question
                            }
                        </Text>


                    </View>
                    <View style={styles.choicesContainer}>
                        {

                        this.state.questions[this.state.questionIndex].actions.map((data, key) =>                 
                        {   
                          
                            {   
                                returnComp = 
                                    <View key={key} style={styles.choicesContainer}>
                                        {   
                                            this.state.checked.includes(key)?
                                            <TouchableWithoutFeedback onPress={()=>{this.setState({checked: this.state.checked.filter(item => item !== key )})}}> 
                                                <View style={styles.choiceHighlight}>
                                                        <Icon 
                                                            style={styles.iconContainer}
                                                            name={'check'}
                                                            color={'white'}
                                                            size={30}
                                                            />   
                                                            <Text style={[styles.choiceText, {marginLeft: 0}]}>{data}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            :
                                            <TouchableWithoutFeedback onPress={()=>{this.setState({checked: [...this.state.checked, key]})}}>

                                                <View style={styles.choiceButton}>
                                                          <Text style={styles.choiceText}>{data}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        }
                                    </View>
                            }

                            return returnComp;
                        })

                        }

                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFAFA'
    },

    categoryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3ffbd'
    },

    categoryText: {
        textAlign: 'center',
        fontFamily: Fonts.MontBlack,
        fontSize: 25,
        padding: 10,
        color: 'black'
    },
            
    headerContainer: {
        flexDirection: 'row'
    },

    remainingContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b2dbbf'
    },

    remainingText: {
        textAlign: 'center',
        fontFamily: Fonts.MontMed,
        fontSize: 20,
        padding: 18,
        color: 'black'
    },
    
    nextButtonContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#70c1b3'
    },

    nextText: {
        textAlign: 'center',
        fontFamily: Fonts.Quicksand,
        fontSize: 20,
        padding: 18,
        color: 'black'
    },

    surveyContainer: {
        flex: 1
    },

    questionContainer: {
        flex: 0.3,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },

    questionText: {
        textAlign: 'center',
        fontFamily: Fonts.MontMed,
        fontSize: 18,
        color: 'black',
        padding: 10
    },

    choicesContainer: {
        flex: 0.7
    },

    choiceButton: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#70c1b2',
        flexDirection: 'row',
        alignItems: 'center'
    },

    choiceHighlight: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#247ca2',
        flexDirection: 'row',
        alignItems: 'center'
    },

    choiceText: {
        textAlign:'left',
        color: '#F5F5F5',
        fontFamily: Fonts.MontMed,
        fontSize: 18,
        marginLeft:75,
        color: 'black'
    },

    iconContainer: {
        padding: 20
    }
})

export default Survey