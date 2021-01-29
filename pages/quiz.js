import React, {useEffect, useState} from 'react';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Loading from '../src/components/Loading';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import base from '../base.json';



function QuestionWidget({question , totalQuestions, questionIndex, onSubmit}){
    const questionId = `question____${questionIndex}`
    return(
      <Widget>
         <Widget.Header>
            <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
          </Widget.Header>
          <img src={question.image} style={{
              height:'200px',
              width: '100%',
              objectFit: 'cover'
              }} />
          <Widget.Content>
            <p>{question.title}</p>
            <form onSubmit={(e) => {
              e.preventDefault()
              onSubmit();
            }}>
            <h1>{question.description}</h1>
            {question.alternatives.map((alternative, alternativeId)=>{
                return(
                    <Widget.Topic as="label" htmlFor={alternativeId}>
                        
                        {alternative}
                        <input type="radio" name={questionId} id={alternativeId} style={{
                                   
                        }}/>
                    </Widget.Topic>
                );
            })}
            <Button type="submit">Confirmar</Button>
            </form>
          </Widget.Content>
        </Widget>       
    );
}

const screenStates = {
      QUIZ: 'QUIZ',
      LOADING: 'LOADING',
      END: 'END'

    } 

export default function QuizPage(){
    const totalQuestions = base.questions.length; 
    const [screenState, setScreenState] = useState(screenStates.LOADING)
    const [questionIndex, setQuestionIndex] = useState(0);
    const question = base.questions[questionIndex];
    

function handleSubmit(){
    const nextQuestion = questionIndex + 1;
    if(nextQuestion < totalQuestions){
      setQuestionIndex(questionIndex + 1)
    }
    else{
      setScreenState(screenStates.END)
    }
    

}
    
    useEffect(()=>{
      setTimeout(() => {
        setScreenState(screenStates.QUIZ)
      }, 2 * 1000);
    }, [])
    return(
    <QuizBackground backgroundImage={base.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && <QuestionWidget question={question} totalQuestions={totalQuestions} questionIndex={questionIndex} onSubmit={handleSubmit}/>}
        {screenState === screenStates.LOADING && <Loading loadingGif={base.loading}/>}
        {screenState === screenStates.END && <div>PARABENS</div>}
      </QuizContainer>
    </QuizBackground>
    )
}