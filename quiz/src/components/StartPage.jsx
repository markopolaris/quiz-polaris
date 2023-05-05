import React, { useState } from 'react';

//odrediti kategorije ✅
//napraviti novi niz gde ce da se dodaju i brisu kategorije koje ce da se dodaju u api ✅
//ispisati sve to u "apiString" ✅
//odrediti tezinu
//napraviti novi niz gde da se dodaju tezine !MORA SAMO DA IMA JEDNA TEZINA
//ispisati sve to u "apiString"
//ispisati pitanja, i odgovore


//api se cesto poziva kroz useEffect ali ne u nasem slucaju, jer nama komponenta treba da se renderuje kad se kliknestart dugme(moramo da napravimo obicnu funkciju)

function StartPage() {

const [selectedCategories, setSelectedCategories] = useState([]);
const [selectDifficulty, setSelectDifficulty] = useState(['easy','medium','hard']);
const [music, setMusic] = useState('music');
const [history, setHistory] = useState('history');
const [science, setScience] = useState('science');
const [geography, setGeography] = useState('geography')
let apiString = `https://the-trivia-api.com/v2/questions?limit=5&categories=${selectedCategories.join()}&difficulties=easy`;



function handleCategoryClick(category) {

if (selectedCategories.includes(category)) {

setSelectedCategories(selectedCategories.filter(cat => cat !== category));
document.getElementById(category).classList.toggle('selected');
} else {

setSelectedCategories([...selectedCategories, category]);
document.getElementById(category).classList.toggle('selected');
}

}


function questions() {
fetch(apiString)
.then(response => response.json())
.then(data => {
console.log(data);
})
.catch(error => {
console.error('Došlo je do greške:', error);
});
}




return (
<section className='h-screen bg-[#1E293B] '>
    <div className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl' id="box">
        <div className="mb-16" id="categories">
            <ul className="flex justify-between gap-20">
                <li className={`text-white ${ selectedCategories.includes('music') ? 'bg-black' : 'bg-[#475569]' } pl-10
                    pr-10 pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('music')}
                    >
                    Music
                </li>
                <li className={`text-white ${ selectedCategories.includes('history') ? 'bg-black' : 'bg-[#475569]' }
                    pl-10 pr-10 pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('history')}
                    >
                    History
                </li>
                <li className={`text-white ${ selectedCategories.includes('science') ? 'bg-black' : 'bg-[#475569]' }
                    pl-10 pr-10 pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('science')}
                    >
                    Science
                </li>
                <li className={`text-white ${ selectedCategories.includes('geography') ? 'bg-black' : 'bg-[#475569]' }
                    pl-10 pr-10 pb-4 pt-4 rounded-lg`} onClick={()=> handleCategoryClick('geography')}
                    >
                    Geography
                </li>
            </ul>
        </div>

        <div id="difficulty">
            <ul className='flex justify-between gap-10'>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Easy</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Medium</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Hard</li>
            </ul>
        </div>

        <button id='startButton' onClick={questions} className='pl-16 pr-16 pt-4 pb-4 block m-auto mt-20'>Start</button>
    </div>

    <div id="questionBox" className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl mt-20'>
        <div id="categoryName"></div>
        <div id="question" className='text-white bg-[#475569] w-9/10 h-40 m-auto'></div>

        <div id="grid" className='grid grid-cols-2 gap-10 mt-20'>
            <div className="answers text-white bg-[#475569] h-20 w-48"></div>
            <div className="answers text-white bg-[#475569] h-20 w-48"></div>
            <div className="answers text-white bg-[#475569] h-20 w-48"></div>
            <div className="answers text-white bg-[#475569] h-20 w-48"></div>
        </div>
    </div>
</section>
);
}

export default StartPage;