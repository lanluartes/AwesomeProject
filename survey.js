// TO DO:
//   [x] Configure the path when the user did not select any of the choices.
//   [+] Add a dependency for pop-up modals for finishing the survey (or use the existing one)
//   [+] Send data to server and compute it.
//   [+] Computation of data.
//   [+] Return computation prediction.

// LEGEND FOR TO DO:
//   [+] - Add
//   [x] - Modify
//   [✓] - Accomplished

import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { Fonts } from './src/utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome'
import questionObj from '../AwesomeProject/assets/files/questionnaire.json'
import questionObj1 from '../AwesomeProject/assets/files/questionnaire1.json'
import rivervar from '../AwesomeProject/assets/files/riverquest.json'
import sheet from '../AwesomeProject/assets/files/sheet.json'
import sheet1 from '../AwesomeProject/assets/files/sheet1.json'

//focus on collecting the river variables first

class Survey extends React.Component{


    constructor(){
        super()
        this.state={
            checked: [],
            riverQuest: rivervar,
            actions : [
                "Drinking",
                "Cooking",
                "Bathing",
                "Cleaning",
                "Laundry",
                "Toilet Use"
              ],

            tryData:questionObj1,
            categoryIndex: 0,

            totalCount: 0,

            questionIndex: 0,
            categoryCount: 0,
            nextText: 'next',
            theAnswer: sheet1,
            enteredSources: [],
            entered2ndSources: [],
            userID: null,

            enteredSourcesObj: {questions:[]},
            entered2ndSourcesObj: {questions:[]}
        }
    }

    //make a questionnaire that will collect the multiplier

    // Work on how to display the data

    static navigationOptions = {
        header: null
      };

    componentDidMount(){
        this.getUser()
        this.getStatus()
        this.setState({categoryCount: this.state.tryData.categories.length})

        // this.props.navigation.navigate('multi', {answers: this.state.theAnswer, genQuestions: this.state.enteredSourcesObj, genQuestions2: this.state.entered2ndSourcesObj})
    }

    componentDidUpdate(prevState, snapshot){
        console.log(this.state.totalCount)
    }

    getStatus = () => {
        const axios = require('axios');
        const myData = new FormData();

        myData.append("userID", this.state.userID)

        axios({
        method: 'POST',
        url: 'http://10.0.2.2/wash-admin/private/verify',
        data: myData
        })
        .then(res => {this.verifyStatus(JSON.parse(res.data))})
        .catch(function(e){console.log(e)})
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

    checkChoiceForSingle = () => {
        // console.log(this.state.categoryIndex, this.state.questionIndex)

        if(this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].isSingle){
            if(this.state.categoryIndex == 0 && this.state.questionIndex == 0 && this.state.checked == 1){
                this.setState(prevState => ({questionIndex: prevState.questionIndex + 2}))
            }

            if(this.state.categoryIndex == 0 && this.state.questionIndex == 5 && this.state.checked == 1){
                this.setState(prevState => ({questionIndex: prevState.questionIndex + 1}))
            }

            if(this.state.categoryIndex == 0 && this.state.questionIndex == 8){
                this.setState(({categoryIndex: 1}))
                this.setState({questionIndex: -1})
            }

            if(this.state.categoryIndex == 0 && this.state.questionIndex == 7 && this.state.checked == 1){
                this.setState(prevState => ({questionIndex: prevState.questionIndex + 1}))
            }
        }
    }

    sendSurvey = data => {
        this.props.navigation.navigate('multi', {userID: this.state.userID, totalCount: this.state.totalCount, genQuestions: this.state.enteredSourcesObj.questions, genQuestions2: this.state.entered2ndSourcesObj.questions})

    }

    endSurvey = () => {
        this.sendSurvey()
    }
    
    nextQuestion = () => {
        this.checkIfMultiplier()
        this.collectAnswer()
        this.checkChoiceForSingle()

        this.setState({checked: []})
        this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].isDone = true;

        if(this.state.questionIndex < this.state.tryData.categories[this.state.categoryIndex].questions.length - 1 ){

            this.setState(prevState => ({questionIndex: prevState.questionIndex + 1}))

        }else if(this.state.categoryIndex === this.state.categoryCount - 1 && this.state.questionIndex === this.state.tryData.categories[this.state.categoryIndex].questions.length - 1){
           
            this.setState({nextText: 'finish'})
            this.endSurvey()

        }
        else{

            this.state.tryData.categories[this.state.categoryIndex].isDone = true;
            this.setState({questionIndex: 0})
            this.setState({categoryIndex: this.state.categoryIndex + 1})

        }
    }

    collectAnswer = () => {
        let someshit = this.state.theAnswer
        someshit.categories[this.state.categoryIndex].answers[this.state.questionIndex].answer = this.state.checked
        
        if(Array.isArray(this.state.checked)){
            console.log("LENGTH:",this.state.checked.length)
            this.setState(prevState => ({totalCount: prevState.totalCount + this.state.checked.length}))
        }else{
            console.log("RAW:",this.state.checked)
            this.setState(prevState => ({totalCount: prevState.totalCount + 1}))
        }

        this.setState({theAnswer: someshit})

        // this.setState(prevState => ({totalCount: prevState.totalCount+this.state.theAnswer.categories[this.state.categoryIndex].answers[this.state.questionIndex].answer.length}))
    }

    checkIfMultiplier = () => {
        
            if(this.state.categoryIndex == 1 && this.state.questionIndex == 1){
                let somearray = this.state.checked;

                this.makeMultiplierQuestions(somearray, this.state.enteredSourcesObj.questions)

            }

            if(this.state.categoryIndex == 1 && this.state.questionIndex == 2){
                let somearray = this.state.checked;

                this.makeMultiplierQuestions(somearray, this.state.entered2ndSourcesObj.questions)
            }

    }

    makeMultiplierQuestions = (data, path) => {
        data.forEach(element => {
            let someobject = {
                question: "What do you do with the water from the " + this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].choices[element] + "?",
                actions: this.state.actions
            }


            path.push(someobject)
        });
        
    }

    render(){
        return(
            <View style={styles.container}>
            
                {/*where the header starts*/}
                <View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            {this.state.tryData.categories[this.state.categoryIndex].name}
                        </Text>
                    </View>

                    <View style={styles.headerContainer}>
                        <View style={styles.remainingContainer}>
                            <Text style={styles.remainingText}>
                                {this.state.questionIndex + 1 } / {this.state.tryData.categories[this.state.categoryIndex].questions.length}
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
                                this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].question
                            }
                        </Text>
                    </View>

                    <View style={styles.choicesContainer}>
                        {

                        this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].choices.map((data, key) =>                 
                        {   
                          
                            let returnComp;
                            
                            if(this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].isSingle === 'true'){    
                                returnComp = 
                                    <View key={key} style={styles.choicesContainer}>
                                        {   
                                            this.state.checked==key?
                                            <TouchableWithoutFeedback>
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
                                            <TouchableWithoutFeedback onPress={()=>{this.setState({checked:key})}}>
                                                <View style={styles.choiceButton}>
                                                          <Text style={styles.choiceText}>{data}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        }
                                    </View>
                                
                            }
                            else if(this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].isSingle === 'false')
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