import React, { useState, useEffect } from 'react';

//treba da pozovem api ✅
//treba da odradim duzinu pitanja ✅
//treba da odredim kategorije koje mi trebaju ✅
//treba da odredim tezinu pitanja ✅
//treba da izdvojim sve parametre u nove nizove

function StartPage() {


useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions?limit=5&categories=music,history,science,geography&difficulties=easy,medium,hard')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Došlo je do greške:', error);
      });
  }, []);




return (
<section className='h-screen bg-[#1E293B] '>
    <div className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl' id="box">
        <div className='mb-16' id="categories">
            <ul className='flex justify-between gap-20'>

                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Music</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>History</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Science</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Geography</li>
            </ul>
        </div>

        <div id="difficulty">
            <ul className='flex justify-between gap-10'>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Easy</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Medium</li>
                <li className='text-white bg-[#475569] pl-10 pr-10 pb-4 pt-4 rounded-lg'>Hard</li>
            </ul>
        </div>

        <button className='pl-16 pr-16 pt-4 pb-4 block m-auto mt-20'>Start</button>
    </div>

    <div id="questionBox" className='bg-[#334155] pl-36 pr-36 pt-20 pb-20 rounded-xl mt-20'>
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