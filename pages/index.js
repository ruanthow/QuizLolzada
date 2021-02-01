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
import Link from '../src/components/Link';
import {} from 'framer-motion';


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState(''); ///Use State const[var, (é uma function setVar) ]
  const [windowState, setWindow] = useState('LOADING');

  useEffect(()=>{
    setInterval(() => {
        setWindow('QUIZ')
      }, 2 * 1000);
  },[])
  

  return (
    <>
    
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
              }} pattern="[A-Za-z]{4,32}" title="No minimo 4 Caracteres sem símbolos"/>
              
              <Button type="submit" disabled={name === '' ? true : false}>
                Jogar
              </Button>
            </form>
            
            
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h2>Quiz da Galera</h2>
            <ul>
              {base.external.map((quizAmigos, key)=>{
                const [projectName,  githubUser] = quizAmigos
                .replace('.vercel.app','')
                .replace('https://','')
                .split('.')
             return (
               <li key={key}>
                 <Widget.Topic as={Link} href={`quiz/${projectName}___${githubUser}`} style={{fontSize:'15px'}}>{
                   `${githubUser}/${projectName}`
                 }</Widget.Topic>
               </li>
               
             )
            })}
            </ul>
            
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ruanthow" />
    </QuizBackground>}
    {windowState === 'LOADING'&& <Loading loadingGif={base.loading}/>}
    </>
  );
}