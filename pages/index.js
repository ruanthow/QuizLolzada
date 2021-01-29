import React, {useState, useEffect} from 'react';
import base from '../base.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import {useRouter} from 'next/router';
import Loading from '../src/components/Loading';


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState(''); ///Use State const[var, (é uma function setVar) ]
  const [windowState, setWindow] = useState('LOADING');

  useEffect(()=>{
    setInterval(() => {
        setWindow('QUIZ')
      }, 3 * 1000);
  },[])
  

  return (
    <>
    {windowState === 'LOADING'&&
    <Loading loadingGif={base.loading}/>}
    {windowState === 'QUIZ'&& <QuizBackground backgroundImage={base.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{base.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{base.description}</p>

            <form onSubmit={function(event){
              event.preventDefault();
              router.push(`/quiz?name=${name}`)
            }}>
              <Input placeholder="Digite seu Nome" onChange={function(event){
                  setName(event.target.value)
              }} pattern="[A-Za-z]{4,32}" />
              <Button type="submit" disabled={name === '' ? true : false}>
                Jogar
              </Button>
            </form>
            
            
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ruanthow" />
    </QuizBackground>}
    </>
  );
}