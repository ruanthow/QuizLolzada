import React, {useEffect, useState} from 'react';
import Widget from '../../Widget';
import QuizLogo from '../../QuizLogo';
import QuizBackground from '../../QuizBackground';
import Loading from '../../Loading';
import QuizContainer from '../../QuizContainer';
import Button from '../../Button';
import Footer from '../../Footer';
//import base from '../../base.json';
import AlternativesForm from '../../AlternativesForm';
import BackLinkArrow from '../../BackArrow';
import Link from 'next/link';


function Results({results}){

  return(
    <Widget>
      <Widget.Header>
       <BackLinkArrow  href="/"/>
       <h1>Parabéns</h1>
      </Widget.Header>
      <Widget.Content>
        <p>Você Acertou {results.reduce((somatoriaAtual, resultadoAtual)=>{
         
          if(resultadoAtual === true){
            return somatoriaAtual + 1;
          }
          return somatoriaAtual
        }, 0)}</p>
        <ul>
          {results.map((result, key)=>(
           <li key={key}>
             {key+1} Resultado: {result === true ? 'Acertou' : 'Errou'}
           </li>        
         ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
  
}

export default function QuizPage({dbExterno,bg}){
  const totalQuestions = dbExterno.questions.length; 
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults]= useState([])
  const question = dbExterno.questions[questionIndex];
  function ADDresult(result){
    setResults([
      ...results,
      result
    ])
  }

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
    }, 1 * 1000);
  }, [])
  return(
  <QuizBackground backgroundImage={bg}>
    <QuizContainer>
      <QuizLogo />
      {screenState === screenStates.QUIZ && 
      <QuestionWidget question={question} ADDresult={ADDresult} totalQuestions={totalQuestions} questionIndex={questionIndex} onSubmit={handleSubmit}/>}
      {screenState === screenStates.END && 
      <Results results={results}/>}
    </QuizContainer>
  </QuizBackground>
  )
}

function QuestionWidget({question , totalQuestions, questionIndex, onSubmit, ADDresult}){
    const questionId = `question____${questionIndex}`;
    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isFormSubmit, setIsFromSubmit] = useState(false);
    const isCorret = selectedAlternative === question.answer;
    return(
      <Widget>
        
         <Widget.Header>
           <BackLinkArrow href="/"/>      
            <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
          </Widget.Header>
          <img src={question.image} style={{
              height:'200px',
              width: '100%',
              objectFit: 'cover'
              }} />
          <Widget.Content>
            <p>{question.title}</p>
            <AlternativesForm onSubmit={(e) => {
              e.preventDefault()
              setIsFromSubmit(true);
              setTimeout(() => {
                ADDresult(isCorret);
                onSubmit();
                setSelectedAlternative(undefined);
                setIsFromSubmit(false);
              }, 2 * 1000);
              
              
            }}>
            <h1>{question.description}</h1>
            {question.alternatives.map((alternative, alternativeId)=>{
                const alternativeStatus = isCorret ? 'SUCCESS' : 'ERROR';
                const isSelected = selectedAlternative === alternativeId ;
                return(
                    <Widget.Topic data-selected={isSelected} data-status={isFormSubmit && alternativeStatus} as="label" htmlFor={alternativeId} key={alternativeId}>
                        
                        {alternative}
                        <input type="radio"  name={questionId} id={alternativeId} onChange={()=>{setSelectedAlternative(alternativeId)}} style={{
                          display:'none'      
                        }}/>
                       
                    </Widget.Topic>
                );
            })}
            <Button type="submit" disabled={selectedAlternative === undefined}>Confirmar</Button>
            {isFormSubmit && isCorret && <p>Acertou!</p>}
            {isFormSubmit && !isCorret && <p>Errou!</p>}
            </AlternativesForm>
          </Widget.Content>
        </Widget>       
    );
}

const screenStates = {
      QUIZ: 'QUIZ',
      LOADING: 'LOADING',
      END: 'END'

    } 