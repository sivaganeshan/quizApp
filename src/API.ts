import {shuffleArray} from './utils';

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard"
}

export type Question = {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

export type QuesyionState = Question & {answers:string[]}

export const fetchQuizQuestions = async(amount:number, difficulty:Difficulty, category:string) =>{
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
    const data = await(await fetch(endpoint)).json();
    if(data.results.length === 0) return undefined;
    return data.results.map((question:Question)=>(
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers,question.correct_answer]),
        }
    ))
}