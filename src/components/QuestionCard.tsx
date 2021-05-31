import React from "react";
import {AnswerObject} from "../App"

type props = {
  question: string;
  answers: string[];
  callback: (e:React.MouseEvent<HTMLButtonElement>)=> void;
  userAnswer: any;
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
  <div>
    <p className="number">Question:{questionNr} / {totalQuestions}</p>
    <p className= "question"dangerouslySetInnerHTML={{__html: question}} />
    <div >
        {answers.map(answer=>(
            <div key={answer}>
            <button disabled={userAnswer? true:false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
            </div>
        ))}
    </div>
  </div>
);

export default QuestionCard;
