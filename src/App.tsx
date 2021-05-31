import React,{useState} from 'react';
import { walkUpBindingElementsAndPatterns } from 'typescript';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuesyionState} from './API';
import {GlobalStyle,Wrapper} from './App.style';

export type AnswerObject ={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
  }

function App() {


const TOTAL_QUESTIONS = 10;



const [loading,setLoading] = useState(false);
const [questions,setQuestions] = useState<QuesyionState[]>([]);
const [number, setNumber] = useState(0);
const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(true);



const startTrivia = async ()=>{

setLoading(true);
setGameOver(false);
const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY);
setQuestions(newQuestions);
setLoading(false);
setScore(0);
setUserAnswers([]);
setNumber(0);
}
const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
 if(!gameOver){
  const answer = e.currentTarget.value;
  const correct = answer == questions[number].correct_answer;
  if(correct) setScore(prev=> prev+1);
  const answerObject:AnswerObject={
    question:questions[number].question,
    answer,
    correct,
    correctAnswer:questions[number].correct_answer,
  }
  setUserAnswers(prev=> [...prev, answerObject]);
 }
  

}

const nextQuestion = ()=>{
  if(number < TOTAL_QUESTIONS-1){
    setNumber(number+1);
  }else{
    setGameOver(true);
    setScore(0);
  }
  
}



  return (
    <>
    <GlobalStyle />
     <Wrapper >
    <div className="App">
     <h1>Quiz App</h1>
     {gameOver || userAnswers.length === TOTAL_QUESTIONS?(<button className="start" onClick={startTrivia}>start</button>):null}
     {!gameOver?<p className="score">Score:{score}</p>:null}
     {loading && <p className="loading">questions loading , Please wait....</p>}
     {!loading && !gameOver && (
     <QuestionCard 
     questionNr={number+1}
     totalQuestions={TOTAL_QUESTIONS}
     question={questions[number].question}
     answers = {questions[number].answers}
     userAnswer={userAnswers?userAnswers[number]:undefined}
     callback={checkAnswer}
     /> )}
     <br/>
     {!loading && !gameOver  && userAnswers.length === number +1 && <button className="next" onClick={nextQuestion}>Next</button>}
    </div>
    </Wrapper>
    </>
  );
}

export default App;
