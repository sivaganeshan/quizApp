import React from "react";
import {AnswerObject} from "../App"
import {Wrapper, ButtonWrapper} from './QuestionCard.style'

type props = {
  question: any;
  answers: any[];
  callback: (e:React.MouseEvent<HTMLButtonElement>)=> void;
  userAnswer: AnswerObject|undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <Wrapper>
    <p className="number">Question:{questionNr} / {totalQuestions}</p>
    <p className= "question"dangerouslySetInnerHTML={{__html: question}} />
    <div >
        {answers.map(answer=>(
            <ButtonWrapper 
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            key={answer}
            >
            <button disabled={userAnswer? true:false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
            </ButtonWrapper>
        ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
