import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {finish, ipConfig} from "../../../scripts/enums"
import useAsyncStorage from '../../helper/useAsyncStorage';

const SurveyScreen = ({ navigation, route }) => {
  const {ProfileInfo} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSurveyQuestions, setUserSurveyQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
 console.log(userSurveyQuestions.length, userSurveyQuestions.length === 0)
 console.log("kflvjdfk")

 const { getData } = useAsyncStorage();

  useEffect(() => {
    async function getSurveyQuestions(){
      const response = await fetch(`${ipConfig}Profile/GetProfileTest`)
      if(response.ok){
        const data = await response.json();
        console.log("data: ", data["$values"])
        setUserSurveyQuestions(data["$values"])
      }
    }
    getSurveyQuestions();
  }, [])

  const handleNext = (questionId ,optionId) => {
    setAnswers((prev) => [...prev, {
      questionId, optionId
    }]);

    if (currentQuestionIndex < userSurveyQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleFinish = async () => {
    const UserId = Number(await getData("userID"));
    const profileTestAnswers = answers.reduce((acc, { questionId, optionId }) => {
      const key = `${['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh',
                      'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 
                      'Fourteenth', 'Fifteenth'][questionId - 1]}QuestionAnswer`;
      acc[key] = optionId;
      return acc;
    }, {});
    console.log(profileTestAnswers,ProfileInfo);
    const response = await fetch(`${ipConfig}Profile/AddProfile`,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({ ProfileInfo : ProfileInfo, ProfileAnswer : profileTestAnswers})
    })
    if(response.ok){
      const data = await response.json()
      console.log("form ekranı datası:", data)
      // navigation.navigate("UserCustomizeSurpriseScreen");
      navigation.navigate('UserCustomizeSurpriseScreen', { user: data.userRelativeId });
    }
  };
  
  if(userSurveyQuestions.length === 0){
    console.log("girdi")
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionTextStyle}>
        {userSurveyQuestions[currentQuestionIndex].questionText}
      </Text>

      {userSurveyQuestions[currentQuestionIndex].options["$values"].map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleNext(userSurveyQuestions[currentQuestionIndex].questionId, option.optionId)}>
        <Text style={styles.optionText}>{option.optionText}</Text>
        </TouchableOpacity>
      ))}

      {currentQuestionIndex === userSurveyQuestions.length - 1 && (
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>{finish}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.progress}>
        Soru {currentQuestionIndex + 1} / {userSurveyQuestions.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  questionTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  progress: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  finishButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SurveyScreen;
