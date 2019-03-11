// TO DO:
//   [x] Configure the path when the user did not select any of the choices.
//   [+] Add a dependency for pop-up modals (or use the existing one)
//   [+] Send data to server and compute it.
//   [+] Computation of data.
//   [+] Return computation prediction.

// LEGEND FOR TO DO:
//   [+] - Add
//   [x] - Modify
//   [✓] - Accomplished

import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native'
import { Fonts } from './src/utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome'
import questionObj from '../AwesomeProject/assets/files/questionnaire.json'
import sheet from '../AwesomeProject/assets/files/sheet.json'


class Survey extends React.Component{


    constructor(){
        super()
        this.state={
            checked: [],
            tryData:questionObj,
            categoryIndex: 0,
            questionIndex: 0,
            categoryCount: 0,
            isLast: false,
            nextText: 'next',
            theAnswer: sheet,
            subQuestion: null,
            subChoices: null
        }
    }

    // WORK ON THE COLLECTION OF THE DATA

    static navigationOptions = {
        header: null
      };


    componentDidMount(){
    this.setState({categoryCount: this.state.tryData.categories.length})
    }

    checkIfChoiceLeadsToBranch = () => {

    }

    componentDidUpdate(prevState, snapshot){
        // if(categoryIndex == 1 && questionIndex == 3){
        //     if(this.state.checked == 0){
        //         this.setState({questionIndex: this.state.questionIndex + 1})
        //     }
        // }

        // console.log(snapshot.checked)
    }

    sendSurvey = data => {
        const axios = require('axios');
        const myData = new FormData();

        myData.append("Answers", this.state.theAnswer)

        // axios({
        //     method: 'POST',
        //     url: 'http://10.0.2.2/wash-admin/private/calculatedata',
        //     data: myData
        //   })
        //   .then(res => {console.log(res.data)})
        //   .catch(function(e){console.log(e)})

        console.log(myData)
    }

    endSurvey = () => {
        this.setState({nextText: 'finish'})
        this.sendSurvey()
    }

    collectAnswer = () => {
        let someshit = this.state.theAnswer
        someshit.categories[this.state.categoryIndex].answers[this.state.questionIndex].answer = this.state.checked
        this.setState({theAnswer: someshit})
        this.setState({checked: []})
    }

    nextQuestion = () => {
        this.collectAnswer()
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
                            {this.state.tryData.categories[this.state.categoryIndex].questions[this.state.questionIndex].question}
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