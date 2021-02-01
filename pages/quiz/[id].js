import React from 'react';
import QuizScreen from '../../src/components/Screens/Quiz'
import {ThemeProvider} from 'styled-components'


export default function QuizDaGalera({dbExterno, bg}){
    return(
      <ThemeProvider theme={dbExterno.theme}>
          <QuizScreen dbExterno={dbExterno.questions} bg={dbExterno.bg}>
              FALA ARROMBADO
              <prev style={{color:'black'}}>
                {JSON.stringify(dbExterno.questions, null , 1)}
              </prev>
          </QuizScreen>
      </ThemeProvider>
        
    )
}

export async function getServerSideProps(context) {
  try {
    const [projectName, githubUser] = context.query.id.split('___')
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res)=>{
       return res.json()
    })
    .then((resJson)=>{
       return resJson;
    })
    .catch((err)=>{
       console.log(err)
    })
    console.log(dbExterno);
    return { 
      props: {
        dbExterno,
        }
      }
  } catch (error) {
    throw new Error(error)
  }

  }
