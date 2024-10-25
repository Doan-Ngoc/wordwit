import './sidebar.css'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import wordList from '../../wordList.json'
import Key from '../Key/Key';
import { rootState } from "../../redux/interface";
import {getHint} from '../../redux/boardSlice';

const SideBar = () => {
  const correctWord = useSelector((state:rootState) => state.board.correctWord)
  const guessedLetters= useSelector((state:rootState) => state.board.hints.guessedLetters)
  const hintUsed= useSelector((state:rootState) => state.board.hints.hintUsed)
  const hintGiven= useSelector((state:rootState) => state.board.hints.hintGiven)
  const dispatch = useDispatch()

  const hintArray = [...hintGiven, "", "", ""].slice(0, 3); 
  const clickHint = () => {
    const availableLetters = correctWord.split("").filter(letter => !guessedLetters.includes(letter));
    if (availableLetters.length > 0 && hintUsed<3) {
      const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
      alert(`Hint: One of the letters is "${randomLetter}".`);
      dispatch(getHint(randomLetter))
      hintArray.push(randomLetter)
    } else {
      alert("No more hints available.");
    }
  };

  return (
    <div className='sidebar'>
        <button>Tutorial</button>
        <div className='hint'>
            <button onClick={clickHint}>Hint</button>
            <div className='hint-list'>
                {/* <span className='hint-item'></span>
                <span className='hint-item'></span>
                <span className='hint-item'></span> */}
                {hintArray.map((letter, index) => {
                  if (letter === "") return <span key={index} className='hint-item' />
                    else return <h1 key={index}>{letter}</h1>
          })}
            </div>
        </div>
    </div>
  )
}

export default SideBar