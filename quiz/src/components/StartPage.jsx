import React, { useState, useEffect } from 'react';

//------------------------------------------------------------------------------------------

function StartPage() {

const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedDifficulty, setSelectedDifficulty] = useState([]);
const [newQuestions, setNewQuestions] = useState([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [showQuestionBox, setShowQuestionBox] = useState(false);
const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
const apiString = `https://the-trivia-api.com/v2/questions?limit=5&categories=${selectedCategories.join()}&difficulties=${selectedDifficulty.join()}`;


function handleCategoryClick(category) {
  if (selectedCategories.includes(category)) {
    setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  } else { setSelectedCategories([...selectedCategories, category]);
  }
}
//dodajemo kategorije u newQuestions
//------------------------------------------------------------------------------------------
function handleDifficultyClick(difficulty) {
  if (selectedDifficulty.includes(difficulty)) {
    setSelectedDifficulty([]);
  } else {
    setSelectedDifficulty([difficulty]);
  }
}
//dodajemo tezinu u newQuestions
//------------------------------------------------------------------------------------------
async function questions() {
  try {
    const response = await fetch(apiString);
    const data = await response.json();
    setNewQuestions(data);
    setCurrentQuestionIndex(0);
    setShowQuestionBox(true);
    console.log(data);
  } catch (error) {
    console.error('DOSLO JE DO GRESKE:', error);
    alert('POPINI POLJA');
  }
}
//zovemo api

function handleAnswerClick(answer) {
  const currentQuestion = newQuestions[currentQuestionIndex];
  const questionBox = document.getElementById('questionBox');

  if (answer === currentQuestion.correctAnswer) {
    setTimeout(function () {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 3000); 
    questionBox.style.backgroundColor = 'green';
    setCorrectAnswerCount((prevCount) => prevCount + 1)
    console.log('TACAN ODGOVOR');
  } else {
    setTimeout(function () {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIncorrectAnswerCount((prevCount) => prevCount + 1);
    }, 3000); 
    questionBox.style.backgroundColor = 'red';
    console.log('NETACAN ODGOVOR');
  }

  if (currentQuestionIndex + 1 === 5) {
    console.log('Gotov kviz');
    let resultBox = document.querySelector('#result').style.display = 'block';
    let questionBox = document.querySelector('#questionBox').style.display = 'none';
  }

  setTimeout(function () {
    questionBox.style.backgroundColor = '';
  }, 3000); 
}
//proveravamo da li je odgovor tacan ili netacan
//------------------------------------------------------------------------------------------

return (
<section className='h-screen bg-[#1E293B] '>
  <div className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl' id="box" style={{ display: showQuestionBox ? 'none' : 'block' }}>
    <div className="mb-16" id="categories">
      <ul className="flex justify-between gap-20">
        <li className={`text-white ${ selectedCategories.includes('music') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('music')}
          >
          Music
        </li>
        <li className={`text-white ${ selectedCategories.includes('history') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('history')}
          >
          History
        </li>
        <li className={`text-white ${ selectedCategories.includes('science') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('science')}
          >
          Science
        </li>
        <li className={`text-white ${ selectedCategories.includes('geography') ? 'bg-black' : 'bg-[#475569]' } pl-10
          pr-10 pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('geography')}
          >
          Geography
        </li>
      </ul>
    </div>

    <div id="difficulty">
      <ul className='flex justify-between gap-10'>
        <li className={`text-white ${selectedDifficulty.includes('easy') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleDifficultyClick('easy')}>Easy </li>
        <li className={`text-white ${selectedDifficulty.includes('medium') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleDifficultyClick('medium')}>Medium </li>
        <li className={`text-white ${selectedDifficulty.includes('hard') ? 'bg-black' : 'bg-[#475569]' } pl-10 pr-10
          pb-4 pt-4 rounded-lg`} onClick={()=> handleDifficultyClick('hard')}>Hard </li>
      </ul>
    </div>

    <button id='startButton' onClick={questions} className='pl-16 pr-16 pt-4 pb-4 block m-auto mt-20'>Start</button>
  </div>

  <div id="questionBox" className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl' style={{ display: showQuestionBox ? 'block' : 'none' }}>
  <div id="categoryName"></div>
  <div id="question" className='text-white bg-[#475569] w-9/10 h-40 m-auto'>
    {newQuestions.length > 0 && (
      <span>{newQuestions[currentQuestionIndex].question.text}</span>
    )}
  </div>
  <div id="grid" className='grid grid-cols-2 gap-10 mt-20'>
  {newQuestions.length > 0 &&
  newQuestions[currentQuestionIndex].incorrectAnswers
    .concat(newQuestions[currentQuestionIndex].correctAnswer)
    .sort(() => Math.random() - 0.5)
    .map((answer, index) => (
      <div
        id='answerBox'
        key={index}
        className="answers text-white bg-[#475569] h-20 w-48"
        onClick={() => handleAnswerClick(answer)}
      >
        {answer}
      </div>
    ))}
  </div>
</div>

<div id="result" className=" hidden bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl mt-20">
        <p id="correctAnswerCount" className='text-white text-center text-xl'>Correct Answers: {correctAnswerCount}</p>
        <p id="incorrectAnswerCount" className='text-white text-center text-xl'>Incorrect Answers: {incorrectAnswerCount}</p>
        <button className="pl-16 pr-16 pt-4 pb-4 block m-auto mt-20">Play Again</button>
      </div>
</section>
);
}

export default StartPage;