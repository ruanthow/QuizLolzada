import React from 'react';
import QuizScreen from '../../src/components/Screens/Quiz'
import {ThemeProvider} from 'styled-components'




export default function QuizDaGalera({dbExterno}){
  
    return(
      <ThemeProvider theme={dbExterno.theme}>
          <QuizScreen dbExterno={dbExterno} bg={dbExterno.bg}>
          </QuizScreen>
      </ThemeProvider>
        
    )
}

export async function getServerSideProps(context) {
  
    const [projectName, githubUser] = context.query.id.split('___')
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res)=>{
       return res.json()
    })
    .then((resJson)=>{
       return resJson;
    })
    .catch((e)=>{
      return e;
    })
    return { 
      props: {
        dbExterno,
        }
  }
}